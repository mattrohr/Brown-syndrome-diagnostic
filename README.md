<p align="center">
<img width="75%" src="https://i.imgur.com/DgqglJK.png" alt="Banner">
</p>

<p align="center">
<b>Detect asynchronous eye movement</b>
</p>

<p align="center">
<a href="https://eye.mattrohr.com"><img src="https://img.shields.io/github/deployments/mattrohr/Brown-syndrome-diagnostic/github-pages?label=deploy" alt="Deploy Status Badge"></a>
</p>

## About
⚠️ For Investigational Use Only. The performance characteristics of this product have not been established. ⚠️

If inflammation causes eye tendons to tighten or loosen, gaze will be uncontrollable. This is called Brown syndrome, and often afflicts only one eye.

Diagnosis requires a specialist. Measurement methodology varies between a simple ruler held between the eyes to a [prism cover test](https://upload.wikimedia.org/wikipedia/commons/8/81/Prism_Cover_Test.webm) (see 2:33). Both are susceptible to human error. In the case of the prism cover test, imagine an energetic 5-year old patient holding a ruler exactly 33 [centimeters] away from their face, while they have the anxiety of having a life altering condition, while some stranger rubs plastic rods on their eye. It's the 18th century equivalent of simultaneously rubbing your tummy and patting your head, but if you or your partner loses, you go blind. Also keep in mind:
    - Brown syndrome is a rare condition which most technicians will never see in their career, so it's possible they don't know what they're looking for or misinterpret measurements,
    - Measurements is only of one eye at a time,
    - Subjective measurement, and varies between specialists.
If deviation could be  measure both eyes passively, continuously, and without specialized tools, it could reduce human error and result in quicker, more accurate diagnosis. This may have wider potential for measuring general forms called strabismus.

This repository includes browser-based software to measure deviation in one eye. It compares locations pupil separation across their full range of motion, and detects if there's head movement that would invalidate the pupil measurement. Current facial detection projects are inadequate because they may locate either pupil or other facial landmarks, but not both.

[Interactive Demo](https://eye.mattrohr.com) (use desktop Chrome)

If this is helpful in your work, please cite:
    @misc{rohr2021brownsyndromediagnostic,
      author = {Matthew Rohr},
      title = {Brown Syndrome Diagnostic},
      year = {2021},
      howpublished = {\url{https://github.com/mattrohr/Brown-syndrome-diagnostic}},
      note = {commit xxxxxxx}
    }

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

4. (_optional_) On a secondary device, [visit facial simulation webpage](simultedface.mattrohr.com) or run it locally:
```bash
python src/animate-face.py
```

## Notes
- Design Considerations
    - Language selection: JavaScript, Python OpenCV, Matlab, Swift/Kotlin
    - Method: ML vs violet

- Problems:
    - Convert pixels to distance with fiducial
    - Landmark separation displayed even when
    - Violet method for facial features (since it's much faster than face-api). Or Tensorflow.js facial landmark example (seems similar in speed though). If they're the same speed, measurement can be passive. User can play a game or minimize and return.
    - Where does this fit in the diagnostic pipeline? It may be good at detecting subtle symptoms. What tool do doctors use now to measure? May be best to add a step to analyze images in the background, and suggest they see a doctor when something is anomalous. Rare diseases, triage, emergency (time-limited) decisions, rural, user-facing. Seems we need an amazon for diagnostics, like IBM Watson
    - eye detection is ~3x faster than landmarks. But how fast exactly?
    - multi-face support 
    -  You can ensure pupils are tracked as you look away by recording your screen. You may also present pictures from your mobile device (e.g. <a href="https://www.google.com/search?q=brown+syndrome&client=safari&rls=en&source=lnms&tbm=isch&sa=X&ved=2ahUKEwi6gIiZmazwAhWXQs0KHW-PAf4Q_AUoAXoECAEQAw&biw=1536&bih=880">search images</a>). 
    - how to test accuracy for rare disease? Scrap images of people --> 

- Future Directions
    - Since developing this project, [Ann Yuan](https://twitter.com/wakoan) and [Andrey Vakunov](https://twitter.com/GreenBeanDou) on Google's Tensorflow.js team [integrated pupil detection and facial landmark detection]([https://blog.tensorflow.org/2020/11/iris-landmark-tracking-in-browser-with-MediaPipe-and-TensorFlowJS.html). Tradeoffs. It's slower than our iris tracking. But landmark and pupil seem to occur at the same rate. Seems to be a lot more false positives.  More testing needed.
## Acknowledgements
- [Tensorflow.js team](https://github.com/tensorflow/tfjs) and [Vincent Mühler](https://github.com/justadudewhohacks) for [face-api.js](https://github.com/justadudewhohacks/face-api.js)

- [Davis King](https://github.com/davisking) for [dlib-models](https://github.com/davisking/dlib-models)

- [Nenad Markuš](https://github.com/nenadmarkus) for [picojs](https://github.com/nenadmarkus/picojs)

- [Claudio Brandolino](https://github.com/cbrandolino) for [camvas](https://github.com/cbrandolino/camvas)