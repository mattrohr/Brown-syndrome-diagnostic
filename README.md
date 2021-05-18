<p align="center">
<b>Detect asynchronous eye movement</b>
</p>

<p align="center">
<a href="https://eye.mattrohr.com"><img src="https://img.shields.io/github/deployments/mattrohr/Browns-syndrome-diagnostic/github-pages?label=deploy" alt="Deploy Status Badge"></a>
</p>

## About
⚠️ For Investigational Use Only. The performance characteristics of this product have not been established. ⚠️

If inflammation causes eye tendons to tighten or loosen, gaze will be uncontrollable. This is called Brown's syndrome, and often afflicts only one eye.

Diagnosis requires a specialist. Because this is a rare condition, measurement methodology is not standardized, varies between ophthalmologists, and is manual. Therefore, it is prone to error.

This repository includes browser-based software to measure deviation in one eye. It compares pupil location across their full range of motion. But if the head moves during measurement, that may be detected as pupil deviation. Therefore current facial detection projects are inadequate, because they may detect pupils or faces, but not both.

[Live Demo](https://eye.mattrohr.com)

## Setup
1. Serve current directory on localhost:
```bash
ruby -run -e httpd . -p "${1:-8080}"
```

2. Open localhost in Chrome:
```bash
open -a "Google Chrome" http://localhost:8080
```

3. Follow on-screen instructions. Demo should look like animation above.

## Notes
- Design Considerations
    - Language selection: JavaScript ???
    - Method 
- Problems:
    - Convert pixels to distance with fiducial
    - Landmark separation displayed even when
    - Violet method for facial features (since it's much faster than face-api). Or Tensorflow.js facial landmark example (seems similar in speed though). If they're the same speed, measurement can be passive. User can play a game or minimize and return.
    - Where does this fit in the diagnostic pipeline? It may be good at detecting subtle symptoms. What tool do doctors use now to measure? May be best to add a step to analyze images in the background, and suggest they see a doctor when something is anomalous. Rare diseases, triage, emergency (time-limited) decisions, rural, user-facing. Seems we need an amazon for diagnostics, like IBM Watson
    - eye detection is ~3x faster than landmarks. But how fast exactly?
    - multi-face support 
    -  You can ensure pupils are tracked as you look away by recording your screen. You may also present pictures from your mobile device (e.g. <a href="https://www.google.com/search?q=brown+syndrome&client=safari&rls=en&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi6gIiZmazwAhWXQs0KHW-PAf4Q_AUoAXoECAEQAw&biw=1536&bih=880">search images</a>). 
    - how to test accuracy for rare disease? Scrap images of people --> 
Observations about the quality of the project
```this code can use some refactoring
did a quick implementation to get this to work but ABC would be better.
```

Todo items / issues that you would not want to formally record in an issue tracker

```should make this method work for x < 0 but that's currently out of scope
```

Design decisions - especially non-trivial ones.
```Our standard sort function performs a quick sort, but that does not preserve the order of items equal under the sorting condition, which we need here.
The obvious algorithm would be ABC but that fails here because x could be negative so we need the generalized form (Wikipedia link).
```

Problems encountered and how you solved them. A very important one, in my personal opinion: whenever you run into a problem note it in the log.

```Checked out the code but it gave error XYZ0123, turns out I first had to upgrade component C to version 1.2 or higher.
```

The latter two points are very important. I've often encountered a similar situation or problem - sometimes in a completely different project - and thought "hmm, I remember spending a day on this, but what was the solution again?"

## Acknowledgements
- [Tensorflow.js team](https://github.com/tensorflow/tfjs) and [Vincent Mühler](https://github.com/justadudewhohacks) for [face-api.js](https://github.com/justadudewhohacks/face-api.js)

- [Davis King](https://github.com/davisking) for [dlib-models](https://github.com/davisking/dlib-models)

- [Nenad Markuš](https://github.com/nenadmarkus) for [picojs](https://github.com/nenadmarkus/picojs)

- [Claudio Brandolino](https://github.com/cbrandolino) for [camvas](https://github.com/cbrandolino/camvas)

