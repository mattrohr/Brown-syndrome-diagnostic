<p align="center">
<img width="75%" src="https://i.imgur.com/INSERT URL.png" alt="Banner">
</p>

<p align="center">
<b>INSERT PROJECT TAGLINE</b>
</p>

<p align="center">

<p align="center">
<a href="https://github.com/mattrohr/Browns-syndrome-diagnostic/actions?query=workflow%3Abuild">
<img src="https://github.com/mattrohr/Browns-syndrome-diagnostic/workflows/build/badge.svg?branch=main" alt="Build Status Badge">

</p>

## About
<img align="right" width="40%" src="https://i.imgur.com/KBu69Ng.png" alt="Animation">


## Installation
1.

2.

3.

## Demo
1.

2.

3.

## Notes
- Problems:
    - Convert pixels to distance with fiducial
    - Landmark separation displayed even when
    - Violet method for facial features (since it's much faster than face-api). Or Tensorflow.js facial landmark example (seems similar in speed though). If they're the same speed, measurement can be passive. User can play a game or minimize and return.
    - Where does this fit in the diagnostic pipeline? It may be good at detecting subtle symptoms. What tool do doctors use now to measure? May be best to add a step to analyze images in the background, and suggest they see a doctor when something is anomalous. Rare disesases, triage, emergency (time-limited) decisions, rural, user-facing. Seems we need an amazon for diagnostics, like IBM Watson
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
- [INSERT FIRST LAST](INSERT URL) for her [INSERT project name]INSERT (PROJECT URL])
- [INSERT FIRST LAST](URL) for his [INSERT project name](INSERT PROJECT URL])
