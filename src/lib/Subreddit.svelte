<script lang="ts">
  import { useMachine } from "@xstate/svelte";
  import { createSubredditMachine } from "./subreddit.machine";

  export let name: string;
  let { state, send } = useMachine(createSubredditMachine(name));

  $: ({ posts, subreddit, lastUpdated } = $state.context);
</script>

{#if $state.matches("failure")}
  <p>Error loading posts</p>
  <button on:click={() => send("RETRY")}>Retry</button>
{:else if $state.matches("loading")}
  <p>Loading...</p>
{:else}
  <h2 class="font-semibold text-lg">Browsing /r/{subreddit}</h2>
  <section>
    <small>
      Last updated: {new Date(lastUpdated).toLocaleTimeString()} -
      <button
        on:click={() => send("REFRESH")}
        class="px-2 py-1 bg-orange-600 text-white rounded-sm">Refresh</button
      >
    </small>
  </section>
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
