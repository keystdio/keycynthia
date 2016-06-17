var storyUrl = 'http://keyncynthia.com/storyline.php';

function loadTimeline() {
    $.ajax({
        url: storyUrl,
        type: "GET",
        success: parseStory,

        fail: function(result) {
            console.log(result);
        }
    });
}


function parseStory(data) {
    var yearToStories = {};
    for (var i = 0; i < data.length; i++) {
        var currDate = new Date(data[i].date);
        var currYear = currDate.getYear() + 1900;
        if (yearToStories[currYear] === undefined) {
            yearToStories[currYear] = [data[i]];
        } else {
            yearToStories[currYear].push(data[i]);
        }
    }

    for (var year in yearToStories) {
        if (!yearToStories.hasOwnProperty(year)) continue;

        var yearBlock = document.createElement("h2");
        yearBlock.innerHTML = year;
        document.getElementById('story-line-holder').appendChild(yearBlock);

        var ul = document.createElement("ul");
        ul.classList.add("timeline-items");

        for (var j = 0; j < yearToStories[year].length; j++) {
            var li = document.createElement("li");
            li.classList.add("is-hidden");
            li.classList.add("timeline-item");

            if (yearToStories[year][j].type == "C") {
                li.classList.add("inverted");
            } else if (yearToStories[year][j].type == "B") {
                li.classList.add("centered");
            }

            console.log(j);

            var p  =document.createElement("p");
            p.innerHTML = yearToStories[year][j].story;

            var time = document.createElement("time");
            time.innerHTML = yearToStories[year][j].date;

            li.appendChild(p);
            li.appendChild(time);

            ul.appendChild(li);
        }
        document.getElementById('story-line-holder').appendChild(ul);
    }


    $('.timeline').timelify({

        // animation types
        animLeft: "bounceInLeft",
        animRight: "bounceInRight",
        animCenter: "bounceInUp",

        // animation speed
        animSpeed: 300,

        // trigger position in pixels
        offset: 150
    });

}
