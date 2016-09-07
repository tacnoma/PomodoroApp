var ProgressBar = require('progressbar.js');

var bar = new ProgressBar.Line('#progressbar-container', {
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 50,
  trailWidth: 20,
  trailColor: '#eee',
  easing: 'linear',
  duration: 1000 * 60 * 25, // 25 min.
  text: {
    style: {
      // Text color.
      // Default: same as stroke color (options.color)
      position: 'absolute',
      left: '50%',
      top: '10%',
      padding: 0,
      margin: 0,
      transform: {
        prefix: true,
        value: 'translate(-50%, -50%)'
      }
    }
  },
  from: { color: '#aaf', width: 20 },
  to: { color: '#0f0', width: 20 },
  // Set default step function for all animate calls
  step: function(state, line) {
    line.path.setAttribute('stroke', state.color);
    line.path.setAttribute('stroke-width', state.width);

    var value = Math.round(line.value() * 60 * 25);
    var min = Math.floor(value / 60);
    var sec = Math.round(value % 60);
    line.setText(min.toString() + ':' + sec.toString());
    line.text.style.color = state.color;
  }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';

bar.animate(1.0, function(){
  alert('finished 1 Pomodoro. Good job!')
});
