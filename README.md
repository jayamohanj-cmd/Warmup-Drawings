# Daily Drawing Warm-Up

One drawing prompt per teaching day, sized for a projector. Students see it as they walk in and sketch for the first five minutes of class.

Open `index.html`. That's the whole thing — no server, no build step, no dependencies.

## Keys

| | |
| --- | --- |
| `→` `←` | next / previous prompt |
| `space` | start / pause the timer |
| `r` | reset the timer |
| `c` | write your own prompt |
| `f` | full screen |
| `d` | dark palette |
| `h` | show / hide the key legend |

The rule under the prompt *is* the timer — it drains left to right over four minutes, readable from the back row. The numerals in the corner are for you.

## Writing your own

Press `c` and the prompt becomes typeable in place, in the same type at the same size. `enter` shows it and starts the four minutes; `esc` backs out. An empty prompt cancels.

A custom prompt survives a reload, so a projector reconnect won't lose it, and clears itself the next day. It doesn't use up a day either — tomorrow lands on the prompt it would have anyway. Arrow away and it's dismissed, though `c` reopens what you last typed so you can edit rather than retype.

If one turns out to be a keeper, paste it into `prompts.js`.

## How the day's prompt is chosen

The first load on a new calendar date advances to the next prompt, remembered in `localStorage`. Holidays and snow days handle themselves — nothing advances on a day you don't open it.

Arrow keys stick: skip a prompt today and it stays skipped tomorrow. A different browser or a cleared cache drifts out of sync; pin it back with `?p=17` in the URL, which shows prompt 17 without touching the saved day.

## Files

| | |
| --- | --- |
| `prompts.js` | the 20 prompts — the only file that changes weekly |
| `index.html` `style.css` `app.js` | the page |
| `all.html` | every prompt in a printable list, for planning. Prints to one sheet. |
| `CLAUDE.md` | the rubric, the coverage matrix, and the calibration set |

## Adding prompts

Read `CLAUDE.md` first. The set runs plainest to most demanding, and observation prompts land every fourth day — insert new prompts in the register of their neighbours rather than appending.

## Deploying

Push to `main` and point GitHub Pages at the repo root.
