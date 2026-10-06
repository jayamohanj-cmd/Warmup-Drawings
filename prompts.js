// Daily Drawing Warm-Up — 22 prompts
//
// Cut down from 60 after reading the whole set: these are the ones that work.
// The cut was lopsided — 25 of 30 observation prompts came out against 5 of 30
// invention. See CLAUDE.md before writing more.
//
// ORDER IS THE RAMP. Day order follows id order, so the set is sequenced from
// plainest to most demanding. Insert new prompts in the register of their
// neighbours; don't append an abstract prompt and call it done.
//
// Observation lands every third day (ids 1, 4, 7, 10, 13, 16, 19) — the best
// spread seven observation prompts allow. Keep that rhythm when extending.
//
// Skill tally (targets for the full build are in CLAUDE.md):
//   observation  contour 2 · gesture 2 · memory 1 · value 1 ·
//                cropping 1                                        = 7
//   invention    constraint-game 3 · systems 3 · object-invention 2 ·
//                narrative 2 · worldbuilding 2 · hybrid 1 ·
//                character 1 · metaphor 1                              = 15

const PROMPTS = [
  {
    id: 1,
    type: "observation",
    skill: "contour",
    text: "Draw your own thumb as slowly as you can. Your pencil should still be moving when the timer ends.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 2,
    type: "invention",
    skill: "constraint-game",
    text: "Draw anything in this room using exactly five lines. Not four, not six.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 3,
    type: "invention",
    skill: "systems",
    text: "Draw how a pencil gets from a tree to your hand. Six boxes, no words.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 4,
    type: "observation",
    skill: "value",
    text: "Using only dots, draw an object you can see in this room. Keep going until the timer ends.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 5,
    type: "invention",
    skill: "constraint-game",
    text: "Draw a building using only circles. No straight lines anywhere on the page.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 6,
    type: "invention",
    skill: "systems",
    text: "Draw instructions for tying a shoe. No words, and no more than six panels.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 7,
    type: "observation",
    skill: "gesture",
    text: "Draw the same object on your desk five times, twenty seconds each. Start a new drawing in a new place on the page when the time is up.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 8,
    type: "invention",
    skill: "constraint-game",
    text: "Draw anything you want, but the pencil never leaves the paper and every line must be curved.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 9,
    type: "invention",
    skill: "systems",
    text: "Draw the route from your front door to this art room, from memory.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 10,
    type: "observation",
    skill: "gesture",
    text: "Draw your hand in a new position every thirty seconds. Do not erase and do not go back. Eight drawings by the time the timer ends.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 11,
    type: "invention",
    skill: "object-invention",
    text: "Design a piece of furniture for someone who is always in a hurry. Draw it and label the part they would use first.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 12,
    type: "invention",
    skill: "hybrid",
    text: "Draw a chair halfway through becoming an animal. Not before, not after — the exact middle.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 13,
    type: "observation",
    skill: "cropping",
    text: "Draw nine small squares. Fill each one with something you can see in this room. Make the ninth square as detailed as possible.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 14,
    type: "invention",
    skill: "narrative",
    text: "Someone left this room in a hurry ninety seconds ago. Draw what they left behind. Do not draw the person.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 15,
    type: "invention",
    skill: "object-invention",
    text: "You run a restaurant that serves only one dish. Draw everything on the table when it arrives. Label three parts.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 16,
    type: "observation",
    skill: "memory",
    text: "Study the front of the room for sixty seconds. Turn your back and draw it. You may turn around once, for five seconds, to check.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 17,
    type: "invention",
    skill: "worldbuilding",
    text: "The last tree on earth is kept inside a building. Draw the building from the outside.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 18,
    type: "invention",
    skill: "character",
    text: "Draw the face of someone who has just realized they were wrong about something important.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 19,
    type: "observation",
    skill: "contour",
    text: "Draw your non-drawing hand without once looking at your paper. Move your eyes slowly along every edge and let the pencil follow. Look up when the timer ends.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 20,
    type: "invention",
    skill: "worldbuilding",
    text: "Water is now worth more than gold. Draw what a drinking fountain would look like.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 21,
    type: "invention",
    skill: "narrative",
    text: "Draw the second before something breaks. Whatever it is must still be whole in your drawing.",
    minutes: 4,
    materials: "pencil",
  },
  {
    id: 22,
    type: "invention",
    skill: "metaphor",
    text: "Draw the sound of this room right now. No people, no objects — only marks. Fill the page.",
    minutes: 4,
    materials: "pencil",
  },
];
