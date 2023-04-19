<template>
  <h1>
    Homepage
  </h1>
  <br v-for="i in 100">
  <h2>IMAGE</h2>
  <h5>With src</h5>
  <img src="https://www.w3schools.com/tags/img_pink_flowers.jpg">


  <br v-for="i in 10">
  <h2>IMAGE</h2>
  <h5>With srcset</h5>
  <img srcset="https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-fairy-480w.jpg 480w,https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-fairy-800w.jpg 800w" sizes="(max-width: 600px) 480px,800px" src="https://mdn.github.io/learning-area/html/multimedia-and-embedding/responsive-images/elva-fairy-800w.jpg" alt="Elva dressed as a fairy">


  <br v-for="i in 10">
  <h2>PICTURE</h2>
  <h5>With source</h5>
  <picture>
    <source media="(min-width:650px)" srcset="https://www.w3schools.com/tags/img_pink_flowers.jpg">
    <source media="(min-width:465px)" srcset="https://www.w3schools.com/tags/img_white_flower.jpg">
    <img src="https://www.w3schools.com/tags/img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
  </picture>


  <br v-for="i in 10">
  <h2>VIDEO</h2>
  <h5>With source</h5>
  <video width="400" controls>
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    <source src="https://www.w3schools.com/html/mov_bbb.ogg" type="video/ogg">
    Your browser does not support HTML video.
  </video>


  <br v-for="i in 10">
  <h2>VIDEO</h2>
  <h5>With src</h5>
  <video width="400" controls src="https://www.w3schools.com/html/mov_bbb.mp4" />


  <br v-for="i in 10">
  <h2>AUDIO</h2>
  <h5>With source</h5>
  <audio controls>
    <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">
    <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>


  <br v-for="i in 10">
  <h2>AUDIO</h2>
  <h5>With src</h5>
  <audio controls src="https://www.w3schools.com/html/horse.ogg" />


  <br v-for="i in 10">
  <h2>IFRAME</h2>
  <h5>With src</h5>
  <iframe width="560" height="315" src="https://www.youtube.com/embed/yIKxLX2GWcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</template>