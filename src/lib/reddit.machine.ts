import { assign, createMachine } from "xstate";

const invokeFetchSubreddit = (context: { subreddit: string }) => {
  const { subreddit } = context;
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then((r) => r.json())
    .then((json) => json.data.children.map((child) => child.data));
};

export const redditMachine = createMachine({
  id: "reddit",
  initial: "idle",
  states: {
    idle: {},
    selected: {
      initial: "loading",
      states: {
        loading: {
          invoke: {
            id: "fetch-subreddit",
            src: invokeFetchSubreddit,
            onDone: {
              target: "loaded",
              actions: assign({
                posts: (_context, event) => event.data,
              }),
            },
            onError: "failed",
          },
        },
        loaded: {},
        failed: {},
      },
    },
  },
  context: {
    subreddit: null,
    posts: null,
  },
  on: {
    SELECT: {
      target: ".selected",
      actions: assign({
        subreddit: (_context, event) => {
          // @ts-ignore
          return event.name;
        },
      }),
    },
  },
});
