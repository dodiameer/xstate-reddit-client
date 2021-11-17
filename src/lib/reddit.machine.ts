import { assign, createMachine, spawn } from "xstate";
import { createSubredditMachine } from "./subreddit.machine";

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
  },
  on: {
    SELECT: {
      target: ".selected",
      actions: assign((context: any, event: any) => {
        let subreddit = context.subreddits[event.name];

        if (subreddit) {
          return { ...context, subreddit };
        }

        subreddit = spawn(createSubredditMachine(event.name));
        return {
          subreddits: {
            ...context.subreddits,
            [event.name]: subreddit,
          },
          subreddit,
        };
      }),
    },
  },
});
