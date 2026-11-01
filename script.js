(function () {
  var D = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/';
  var icon = function (n, v) { return D + n + '/' + n + '-' + (v || 'original') + '.svg'; };

  // Tool logos (devicon CDN). Edit freely: [label, icon folder, variant]
  var tools = [
    ['AWS', 'amazonwebservices', 'plain-wordmark'],
    ['Linux', 'linux'],
    ['Git', 'git'],
    ['GitHub', 'github'],
    ['Jenkins', 'jenkins'],
    ['Maven', 'maven'],
    ['Bash', 'bash'],
    ['Python', 'python'],
    ['Apache', 'apache'],
    ['MySQL', 'mysql'],
    ['PHP', 'php'],
    ['Ubuntu', 'ubuntu']
  ];
  var learning = [
    ['Kubernetes', 'kubernetes'],
    ['Docker', 'docker']
  ];
  var awsServices = ['EC2', 'S3', 'CloudFront', 'RDS', 'VPC', 'IAM', 'Lambda', 'SQS', 'SNS',
    'CloudWatch', 'CloudFormation', 'Elastic Beanstalk', 'Auto Scaling', 'Launch Templates',
    'Route 53', 'Organizations', 'CloudShell'];

  function tile(t) {
    var el = document.createElement('div');
    el.className = 'tile';
    var img = document.createElement('img');
    img.src = icon(t[1], t[2]);
    img.alt = t[0] + ' logo';
    img.loading = 'lazy';
    img.onerror = function () { img.style.display = 'none'; };
    var s = document.createElement('span');
    s.textContent = t[0];
    el.appendChild(img); el.appendChild(s);
    return el;
  }

  // marquee (list twice for seamless loop)
  var track = document.getElementById('track');
  tools.concat(tools).forEach(function (t) { track.appendChild(tile(t)); });
  var logos = document.getElementById('logos');
  tools.forEach(function (t) { logos.appendChild(tile(t)); });
  var learn = document.getElementById('learning');
  learning.forEach(function (t) { learn.appendChild(tile(t)); });
  var chips = document.getElementById('awsChips');
  awsServices.forEach(function (n) {
    var s = document.createElement('span'); s.textContent = n; chips.appendChild(s);
  });

  // typed roles
  var words = ['Cloud Automation', 'CI/CD Pipelines', 'Infrastructure as Code', 'Cost Optimization'];
  var el = document.getElementById('typed'), w = 0, c = 0, del = false;
  (function tick() {
    var word = words[w];
    el.textContent = word.slice(0, c);
    if (!del && c < word.length) c++;
    else if (!del) { del = true; return setTimeout(tick, 1400); }
    else if (c > 0) c--;
    else { del = false; w = (w + 1) % words.length; }
    setTimeout(tick, del ? 40 : 85);
  })();

  // nav
  var nav = document.getElementById('nav'), menu = document.getElementById('menu'), burger = document.getElementById('burger');
  window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 20); });
  burger.addEventListener('click', function () {
    var o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
  });
  menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') menu.classList.remove('open'); });

  // reveal + counters
  function count(n) {
    var end = +n.dataset.count, suf = n.dataset.suffix || '', t0 = null;
    (function step(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / 1200, 1);
      n.textContent = Math.round(end * p) + (p === 1 ? suf : '');
      if (p < 1) requestAnimationFrame(step);
    })(performance.now());
  }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        e.target.querySelectorAll('[data-count]').forEach(count);
        io.unobserve(e.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(function (n, i) {
    n.style.transitionDelay = (i % 4) * 70 + 'ms'; io.observe(n);
  });

  // card spotlight
  document.querySelectorAll('.card').forEach(function (c) {
    c.addEventListener('mousemove', function (e) {
      var r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    });
  });

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
