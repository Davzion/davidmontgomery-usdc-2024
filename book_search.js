/**
 * RECOMMENDATION
 *
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 *
 * The Developer Tools in Chrome are available under the "..." menu,
 * futher hidden under the option "More Tools." In Firefox, they are
 * under the hamburger (three horizontal lines), also hidden under "More Tools."
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
  /** You will need to implement your search and
   * return the appropriate object here. */

  // Creates the Result Object
  var result = {
    SearchTerm: "",
    Results: [],
  };

  result.SearchTerm = searchTerm;

  // Iterates through each line/page of the book object
  for (x = 0; x < scannedTextObj[0].Content.length; x++) {
    // Separates Line of text into array for comparing
    var getLine = scannedTextObj[0].Content[x].Text;
    var split = getLine.split(" ");

    // Iterates through words in line
    // If there is a match, the word's location is added to the result object
    for (i = 0; i < split.length; i++) {
      if (split[i] == searchTerm) {
        result.Results.push({
          ISBN: scannedTextObj[0].ISBN,
          Page: scannedTextObj[0].Content[x].Page,
          Line: scannedTextObj[0].Content[x].Line,
        });
      }
      //If current word is last word
      if (split[i] == split[split.length - 1]) {
        var letterSplit = split[i].split("");

        // This section handles words hyphenated between two lines
        // If last word ends with a hyphen then it will remove the hyphen
        if (letterSplit[letterSplit.length - 1] == "-") {
          letterSplit.pop();
          var firstHalf = letterSplit.join("");

          // Takes the first word of next line
          var secondLine = scannedTextObj[0].Content[x + 1].Text;
          var split2 = secondLine.split(" ");

          // Combines the hyphenated word
          var fullWord = firstHalf.concat(split2[0]);

          // Compares search term to combined word
          if (searchTerm == fullWord) {
            result.Results.push({
              ISBN: scannedTextObj[0].ISBN,
              Page: scannedTextObj[0].Content[x].Page,
              Line: scannedTextObj[0].Content[x].Line,
            });
          }
        }
      }
    }
  }

  return result;
}

/** Example input object. */
const twentyLeaguesIn = [
  {
    Title: "Twenty Thousand Leagues Under the Sea",
    ISBN: "9780000528531",
    Content: [
      {
        Page: 31,
        Line: 8,
        Text: "now simply went on by her own momentum. The dark-",
      },
      {
        Page: 31,
        Line: 9,
        Text: "ness was then profound; and however good the Canadian's",
      },
      {
        Page: 31,
        Line: 10,
        Text: "eyes were, I asked myself how he had managed to see, and",
      },
    ],
  },
];

/** Example output object */
const twentyLeaguesOut = {
  SearchTerm: "the",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 9,
    },
  ],
};

// Example multi-line output object
const twentyLeaguesOut2 = {
  SearchTerm: "darkness",
  Results: [
    {
      ISBN: "9780000528531",
      Page: 31,
      Line: 8,
    },
  ],
};

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that
 * output to the console. We've provided two tests as examples, and
 * they should pass with a correct implementation of `findSearchTermInBooks`.
 *
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
  console.log("PASS: Test 1");
} else {
  console.log("FAIL: Test 1");
  console.log("Expected:", twentyLeaguesOut);
  console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn);
if (test2result.Results.length == 1) {
  console.log("PASS: Test 2");
} else {
  console.log("FAIL: Test 2");
  console.log("Expected:", twentyLeaguesOut.Results.length);
  console.log("Received:", test2result.Results.length);
}

// Test for negative match
const test3result = findSearchTermInBooks("FAKEWORDFAKEWORD", twentyLeaguesIn);
if (test3result.Results.length == 0) {
  console.log("PASS: Test 3");
} else {
  console.log("FAIL: Test 3");
  console.log("Expected: 0");
  console.log("Received:", test3result.Results.length);
}

// Test for hyphenated words
const test4result = findSearchTermInBooks("darkness", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut2) === JSON.stringify(test4result)) {
  console.log("PASS: Test 4");
} else {
  console.log("FAIL: Test 4");
  console.log("Expected:", twentyLeaguesOut2);
  console.log("Received:", test4result);
}

// Case-sensitive test
const test5result = findSearchTermInBooks("The", twentyLeaguesIn);
if (test5result.Results.length == 1) {
  console.log("PASS: Test 5");
} else {
  console.log("FAIL: Test 5");
  console.log("Expected: 1");
  console.log("Received:", test3result.Results.length);
}
