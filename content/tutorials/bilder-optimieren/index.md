---
title: 'So optimierst du Bilder für deine Website'
description: ''
date: 2022-01-30T17:31:09+01:00
draft: true
---

# So optimierst du Bilder für deine&nbsp;Website

Die Ladezeit deiner Website entscheidet oft mehr über die Verweildauer deiner Besucher als das Bildmaterial an sich. Ich zeige dir, wie du die Bilder für deiner Website optimal ausliefern kannst.
{.lead}

![Alt](bilder-optimieren.jpg 'Was ist das?')

## Art Direction Images

```html
<picture>
  <source media="(min-width: 1200px)" srcset="my-image-large.jpg" />
  <source media="(min-width: 600px)" srcset="my-image-medium.jpg" />
  <img src="my-image-small.jpg" alt="" />
</picture>
```

Footbar
