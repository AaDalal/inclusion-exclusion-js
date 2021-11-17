// Ingester function
function ingest(eventsString : string): string[] {
  let events: string[] = eventsString.trim().split(",");
  let eventsStripped: string[] = events.map((x: string): string => {
    return x.trim();
  });
  return eventsStripped
}

// Get all subsets [of sz m, m <= maxSubsetSize]
function subset(maxSubsetSize: number, events: string[]): string[][] {
  let subsets: string[][] = [];

  function loop(lastSubset: string[], nextInd: number): void {
    if (lastSubset.length == maxSubsetSize || nextInd > events.length) {
      return;
    }
    for (let i: number = nextInd; i < events.length; i++) { // NOTE: if the nextInd > events.length, the body of the loop is not run
      let newSubset: string[] = [...lastSubset]; // copy last subset
      newSubset.push(events[i]);
      subsets.push(newSubset); 
      loop(newSubset, i + 1);
    }
  }

  loop([], 0);
  return subsets
}

function subsetsToPIE(subsets : string[][], sortByLength : boolean) : string {
  if (sortByLength){
    subsets.sort(x => x.length);
  }
  return subsets.map(x => 
    (x.length % 2 == 0 ? " - " : " + ") + ("Pr[" + x.join("\\cap ") + "]")
  ).join("");
}

// Wrapper fn
let wrapper: () => void = () => {
  let eventsString: string = (<HTMLInputElement>document.getElementById("events")).value;
  let events: string[] = ingest(eventsString);
  let subsets: string[][] = subset(events.length, events);
  let PIE : string = subsetsToPIE(subsets, true); 
  (<HTMLInputElement>document.getElementById("PIE")).value = PIE;
};