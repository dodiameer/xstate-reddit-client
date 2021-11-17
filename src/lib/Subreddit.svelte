<script lang="ts">
  export let service;
  $: ({ posts, subreddit, lastUpdated } = $service.context);
</script>

{#if $service.matches("failure")}
  <p>Error loading posts</p>
  <button on:click={() => service.send("RETRY")}>Retry</button>
{:else if $service.matches("loading")}
  <p>Loading...</p>
{:else}
  <h2 class="font-semibold text-lg">Browsing /r/{subreddit}</h2>
  <section>
    <small>
      Last updated: {new Date(lastUpdated).toLocaleTimeString()} -
      <button
        on:click={() => service.send("REFRESH")}
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
