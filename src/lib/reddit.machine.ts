import { assign, createMachine } from "xstate";

export const redditMachine = createMachine({
  id: "reddit",
  initial: "idle",
  states: {
    idle: {},
    selected: {},
  },
  context: {
    subreddits: {},
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
