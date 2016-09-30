var ProgressBar = require('progressbar.js');

var trailWidth = 10;

var bar = new ProgressBar.Circle('#progressbar-container', {
  // This has to be the same size as the maximum width to
  // prevent clipping
  strokeWidth: 50,
  trailWidth: trailWidth,
  trailColor: '#eee',
  easing: 'linear',
  duration: 1000 * 60 * 25, // 25 min.
  from: { color: '#aaa', width: trailWidth },
  to: { color: '#0f0', width: trailWidth },
  // Set default step function for all animate calls
  step: function(state, circle) {
    circle.path.setAttribute('stroke', state.color);
    circle.path.setAttribute('stroke-width', state.width);

    var value = Math.round(circle.value() * 60 * 25);
    var min = Math.floor(value / 60);
    var sec = Math.round(value % 60);
    circle.setText("Are you ready?");
    circle.text.style.color = state.color;
  }
});
bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
bar.text.style.fontSize = '1rem';

function reset() {
  bar.destroy();
  bar = new ProgressBar.Circle('#progressbar-container', {
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 50,
    trailWidth: trailWidth,
    trailColor: '#eee',
    easing: 'linear',
    duration: 1000 * 60 * 25, // 25 min.
    from: { color: '#c9302c', width: trailWidth },
    to: { color: '#449d44', width: trailWidth },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 60 * 25);
      var min = Math.floor(value / 60);
      var sec = Math.round(value % 60);
      circle.setText("Now working: " + ("0" + min.toString()).substr(-2) + ':' + ("0" + sec.toString()).substr(-2));
      circle.text.style.color = state.color;
    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '1rem';

  bar.animate(1.0, function(){
    alert('finished 1 Pomodoro. Good job!')
  });
  document.getElementById('_rest').disabled = '';
  document.getElementById('_reset').disabled = 'true';
}

function rest() {
  bar.destroy();
  bar = new ProgressBar.Circle('#progressbar-container', {
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 50,
    trailWidth: trailWidth,
    trailColor: '#eee',
    easing: 'linear',
    duration: 1000 * 60 * 5, // 5 min.
    from: { color: '#449d44', width: trailWidth },
    to: { color: '#c9302c', width: trailWidth },
    // Set default step function for all animate calls
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 60 * 5);
      var min = Math.floor(value / 60);
      var sec = Math.round(value % 60);
      circle.setText("Now Resting: " + ("0" + min.toString()).substr(-2) + ':' + ("0" + sec.toString()).substr(-2));
      circle.text.style.color = state.color;
    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '1rem';

  bar.animate(1.0, function(){
    alert('finished rest. Let\'s work!')
  });
  document.getElementById('_rest').disabled = 'true';
  document.getElementById('_reset').disabled = '';
}
