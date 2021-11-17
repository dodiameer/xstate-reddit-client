<script lang="ts">
  import { redditMachine } from "./lib/reddit.machine";
  import { useMachine } from "@xstate/svelte";
  import Subreddit from "./lib/Subreddit.svelte";

  const { state, send } = useMachine(redditMachine);
  const subreddits = ["sveltejs", "reactjs", "programming"];

  const onChange = (e) => send({ type: "SELECT", name: e.target.value });

  $: ({ subreddit } = $state.context);
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
  {#if subreddit}
    <Subreddit service={subreddit} />
  {/if}
</main>
