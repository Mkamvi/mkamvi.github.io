const p = `<blockquote><p id='rainbow'> 🏝️ </p> <blockquote>`;

const s = `
  <script>
fetch('https://api.eatrice.top')
  .then(response => response.json())
  .then(data => {
    var rainbow = document.getElementById('rainbow');
    rainbow.innerHTML = data.Content;
    rainbow.href = "https://rainbow.eatrice.top/?ID=" + data.ID;
  })
  .catch(console.error)
</script> `;

hexo.extend.filter.register("theme_inject", function (injects) {
  injects.postMarkdownEnd.raw("default", p, { key: "value" }, -1);
  injects.bodyEnd.raw("default", s);
});
