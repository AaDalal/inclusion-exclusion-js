var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Ingester function
function ingest(eventsString) {
    var events = eventsString.trim().split(",");
    var eventsStripped = events.map(function (x) {
        return x.trim();
    });
    return eventsStripped;
}
// Get all subsets [of sz m, m <= maxSubsetSize]
function subset(maxSubsetSize, events) {
    var subsets = [];
    function loop(lastSubset, nextInd) {
        if (lastSubset.length == maxSubsetSize || nextInd > events.length) {
            return;
        }
        for (var i = nextInd; i < events.length; i++) { // NOTE: if the nextInd > events.length, the body of the loop is not run
            var newSubset = __spreadArray([], lastSubset, true); // copy last subset
            newSubset.push(events[i]);
            subsets.push(newSubset);
            loop(newSubset, i + 1);
        }
    }
    loop([], 0);
    return subsets;
}
function subsetsToPIE(subsets, sortByLength) {
    if (sortByLength) {
        subsets.sort(function (x) { return x.length; });
    }
    return subsets.map(function (x) {
        return (x.length % 2 == 0 ? " - " : " + ") + ("Pr[" + x.join("\\cap ") + "]");
    }).join("");
}
// Wrapper fn
var wrapper = function () {
    var eventsString = document.getElementById("events").value;
    var events = ingest(eventsString);
    var subsets = subset(events.length, events);
    var PIE = subsetsToPIE(subsets, true);
    document.getElementById("PIE").value = PIE;
};
//# sourceMappingURL=InclusionExclusion.js.map