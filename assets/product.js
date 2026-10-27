/* 차용: reaa/siting/index.html 의 기준별 화면 전환(가리키면 멈추고, 보이는 동안만 넘김) — 랜딩 8쪽 공통 */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-tabs]').forEach(function (box) {
    var items = box.querySelectorAll('.tabs li');
    var figs = box.querySelectorAll('.stage figure');
    var cur = 0, vis = false, held = false, rel = null;
    function show(i) {
      cur = i;
      figs.forEach(function (f, j) { f.classList.toggle('on', j === i); });
      items.forEach(function (li, j) { li.classList.toggle('on', j === i); li.setAttribute('aria-selected', j === i); });
    }
    setInterval(function () { if (vis && !held && !reduce) show((cur + 1) % figs.length); }, 4200);
    new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }, { threshold: 0.3 }).observe(box);
    items.forEach(function (li, j) {
      li.addEventListener('mouseenter', function () { held = true; show(j); });
      li.addEventListener('mouseleave', function () { held = false; });
      li.addEventListener('focus', function () { held = true; show(j); });
      li.addEventListener('blur', function () { held = false; });
      li.addEventListener('click', function () { show(j); held = true; clearTimeout(rel); rel = setTimeout(function () { held = false; }, 9000); });
      li.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); li.click(); } });
    });
  });

  var rises = document.querySelectorAll('.rise');
  if (reduce || !('IntersectionObserver' in window)) { rises.forEach(function (el) { el.classList.add('in'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  rises.forEach(function (el) { io.observe(el); });
})();
