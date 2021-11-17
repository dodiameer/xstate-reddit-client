<script lang="ts">
  import { redditMachine } from "./lib/reddit.machine";
  import { useMachine } from "@xstate/svelte";

  const { state, send } = useMachine(redditMachine);
  const subreddits = ["sveltejs", "reactjs", "programming"];

  const onChange = (e) => send({ type: "SELECT", name: e.target.value });

  $: posts = $state.context.posts;
  $: console.log(posts?.slice(0, 10));
</script>

<main class="container space-y-4 py-6">
  <h1 class="text-orange-600 font-bold text-4xl">Subreddit Picker</h1>
  <select
    on:change={onChange}
    class="border-2 border-orange-500 focus:(ring ring-orange-700 ring-offset-4) rounded-sm px-2 py-1"
  >
    <!-- Only disable when a selection has been made, otherwise selecting the first sub would do nothing -->
    <option disabled={!$state.matches("idle")} value=""
      >&mdash; Select a Subreddit &mdash;</option
    >
    {#each subreddits as subreddit}
      <option value={subreddit}>/r/{subreddit}</option>
    {/each}
  </select>
  <h2 class="font-semibold text-lg">
    {$state.matches("idle")
      ? "Select a subreddit"
      : `Browsing /r/${$state.context.subreddit}`}
  </h2>
  {#if $state.matches({ selected: "loading" })}
    <p>Loading...</p>
  {:else if $state.matches({ selected: "failed" })}
    <p>Error while loading.</p>
  {:else if $state.matches({ selected: "loaded" })}
    <ul class="space-y-1 list-circle list-inside">
      {#each posts as post}
        <li>
          <a class="text-orange-600 hover:text-blue-600" href={post.url}>
            {@html post.title}
          </a>
        </li>
      {/each}
    </ul>
  {/if}
</main>
