define(['jquery',
        'timer'
], function($,
            Timer){
    var countdownValue,
        minuteSecFormat = /(?=.*[sm])(?:(\d+)m)?\s*(?:(\d+)s)?/i,
        $timer = $(".timer"),
        $timerTitle = $(".timer-title"),
        $resetButton = $(".reset-btn"),
        defaultTimerValue = 30,
        timer = new Timer({
            tick: 1,
            onstart : function(millisec) {
                var sec = Math.round(millisec / 1000);
                $timer.text(sec);
                $timer.removeClass('stopped');
            },
            ontick  : function(millisec) {
                var sec = Math.round(millisec / 1000);
                $timer.text(sec);
            },
            onend   : function() {
                $timer.text('end');
                $timer.addClass('stopped');
            }
        })
    ;

    return {
        getParameterByName: function(name) {
            var url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);

            if (!results) {
                return null;
            } 

            if (!results[2]) {
                return '';
            }
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        getCountdownTitle: function(mins, secs) {
            var title = '';
            if (mins > 0) {
                if (mins > 1) {
                    title = mins + " mins ";
                } else {
                    title = mins + " min ";
                }
            }

            if (secs > 0) {
                if (secs > 1) {
                    title += secs + " secs";
                } else {
                    title += secs + " sec";
                }
            }

            return title + " timer";
        },

        initEvents: function() {
            var self = this;
            $resetButton.click(function(e) {
                self.init();
            });
        },

        init: function() {
            var countdownValue,
                countdownParam = this.getParameterByName("time"),
                countdownTitle = '',
                result,
                minutes,
                seconds
            ;

            if (minuteSecFormat.test(countdownParam)) {
                result = minuteSecFormat.exec(countdownParam);
                minutes = parseInt(result[1], 10) || 0;
                seconds = parseInt(result[2], 10) || 0;

                countdownValue = minutes * 60 + seconds;
                countdownTitle = this.getCountdownTitle(minutes, seconds);

            } else if (!countdownParam || isNaN(countdownParam)) {
                countdownValue = defaultTimerValue;
                minutes = Math.floor(countdownValue / 60);
                seconds = countdownValue % 60;
                countdownTitle = this.getCountdownTitle(minutes, seconds);
            }

            timer.stop();
            timer.start(countdownValue);
            $timerTitle.html(countdownTitle);
        }
    };
});
