/* ================================================================
   STEP MATHS SOLVER
   VERSION 3.0 - MOBILE SCROLL FIX
   p5.js Web Editor + Capacitor APK SAFE

   FEATURES
   • Addition
   • Subtraction
   • Multiplication
   • Long Division
   • Decimal numbers
   • Exact decimal arithmetic using BigInt
   • Step-by-step explanations
   • Mobile touch scrolling
   • Mouse wheel scrolling
   • Custom scrollbar
   ================================================================ */


let operation = "addition";

let inputA;
let inputB;

let solveButton;
let clearButton;

let resultSteps = [];
let finalAnswer = "";

let scrollY = 0;
let contentHeight = 0;

let isDragging = false;
let lastTouchY = 0;

const BG = 245;
const CARD = 255;
const TEXT = 30;
const MUTED = 105;
const ACCENT = 55;


/* ================================================================
   SETUP
   ================================================================ */

function setup() {

  createCanvas(windowWidth, windowHeight);

  textFont("Arial");

  /*
     IMPORTANT FOR MOBILE

     Prevent browser/WebView from handling
     the canvas gesture instead of our custom scroll.
  */

  canvas.elt.style.touchAction = "none";
  canvas.elt.style.userSelect = "none";
  canvas.elt.style.webkitUserSelect = "none";

  createInterface();
}


/* ================================================================
   DRAW
   ================================================================ */

function draw() {

  background(BG);

  /*
     Header remains fixed.
  */

  drawHeader();


  /*
     Clip the scrolling content so it doesn't
     draw over the header.
  */

  push();

  drawingContext.save();

  drawingContext.beginPath();

  drawingContext.rect(
    0,
    135,
    width,
    height - 135
  );

  drawingContext.clip();


  translate(
    0,
    -scrollY
  );


  drawMainCard();


  drawingContext.restore();

  pop();


  drawScrollIndicator();
}


/* ================================================================
   RESIZE
   ================================================================ */

function windowResized() {

  resizeCanvas(
    windowWidth,
    windowHeight
  );

  positionInputs();

  updateScrollLimit();
}


/* ================================================================
   UI
   ================================================================ */

function createInterface() {

  inputA =
    createInput("");

  inputB =
    createInput("");


  inputA.attribute(
    "inputmode",
    "decimal"
  );

  inputB.attribute(
    "inputmode",
    "decimal"
  );


  inputA.attribute(
    "placeholder",
    "पहली संख्या"
  );

  inputB.attribute(
    "placeholder",
    "दूसरी संख्या"
  );


  styleInput(inputA);
  styleInput(inputB);


  solveButton =
    createButton("SOLVE");

  solveButton.mousePressed(
    solve
  );

  styleButton(
    solveButton,
    true
  );


  clearButton =
    createButton("CLEAR");

  clearButton.mousePressed(
    clearAll
  );

  styleButton(
    clearButton,
    false
  );


  positionInputs();
}


/* ================================================================
   POSITION INPUTS
   ================================================================ */

function positionInputs() {

  let margin =
    min(
      25,
      width * 0.05
    );


  inputA.position(
    margin,
    150
  );

  inputB.position(
    margin,
    215
  );


  solveButton.position(
    margin,
    280
  );

  clearButton.position(
    margin + 125,
    280
  );


  let inputWidth =
    min(
      width - margin * 2,
      500
    );


  inputA.size(
    inputWidth
  );

  inputB.size(
    inputWidth
  );
}


/* ================================================================
   INPUT STYLE
   ================================================================ */

function styleInput(element) {

  element.style(
    "font-size",
    "20px"
  );

  element.style(
    "padding",
    "12px"
  );

  element.style(
    "border",
    "2px solid #cccccc"
  );

  element.style(
    "border-radius",
    "10px"
  );

  element.style(
    "box-sizing",
    "border-box"
  );

  element.style(
    "background",
    "#ffffff"
  );

  element.style(
    "color",
    "#222222"
  );

  element.style(
    "outline",
    "none"
  );

  element.style(
    "touch-action",
    "auto"
  );
}


/* ================================================================
   BUTTON STYLE
   ================================================================ */

function styleButton(
  element,
  primary
) {

  element.style(
    "font-size",
    "17px"
  );

  element.style(
    "font-weight",
    "bold"
  );

  element.style(
    "padding",
    "11px 20px"
  );

  element.style(
    "border-radius",
    "10px"
  );

  element.style(
    "border",
    "none"
  );

  element.style(
    "cursor",
    "pointer"
  );

  element.style(
    "touch-action",
    "auto"
  );


  if (primary) {

    element.style(
      "background",
      "#222222"
    );

    element.style(
      "color",
      "#ffffff"
    );

  } else {

    element.style(
      "background",
      "#dddddd"
    );

    element.style(
      "color",
      "#222222"
    );
  }
}


/* ================================================================
   HEADER
   ================================================================ */

function drawHeader() {

  fill(25);

  noStroke();

  textAlign(
    LEFT,
    CENTER
  );

  textSize(
    min(
      30,
      width * 0.075
    )
  );

  textStyle(BOLD);

  text(
    "STEP MATHS",
    20,
    45
  );


  textStyle(NORMAL);

  fill(MUTED);

  textSize(14);

  text(
    "Learn the calculation — not just the answer",
    20,
    78
  );


  drawOperationSelector();
}


/* ================================================================
   OPERATION SELECTOR
   ================================================================ */

function drawOperationSelector() {

  let labels = [

    ["+", "addition"],

    ["−", "subtraction"],

    ["×", "multiplication"],

    ["÷", "division"]

  ];


  let x = 20;

  let y = 105;


  let w =
    min(
      75,
      (width - 50) / 4
    );


  let h = 35;


  for (
    let i = 0;
    i < labels.length;
    i++
  ) {

    let selected =
      operation ===
      labels[i][1];


    fill(
      selected
        ? 30
        : 225
    );


    rect(
      x,
      y,
      w,
      h,
      8
    );


    fill(
      selected
        ? 255
        : 40
    );


    textAlign(
      CENTER,
      CENTER
    );

    textSize(20);


    text(
      labels[i][0],
      x + w / 2,
      y + h / 2
    );


    x += w + 8;
  }
}


/* ================================================================
   MAIN CARD
   ================================================================ */

function drawMainCard() {

  let top = 340;


  fill(CARD);

  noStroke();


  rect(
    15,
    top,
    width - 30,
    100,
    15
  );


  fill(TEXT);

  textAlign(
    LEFT,
    TOP
  );

  textSize(20);

  textStyle(BOLD);


  let title = "";


  if (
    operation === "addition"
  )
    title =
      "➕ Addition";


  if (
    operation === "subtraction"
  )
    title =
      "➖ Subtraction";


  if (
    operation === "multiplication"
  )
    title =
      "✖ Multiplication";


  if (
    operation === "division"
  )
    title =
      "➗ Long Division";


  text(
    title,
    30,
    top + 18
  );


  textStyle(NORMAL);

  fill(MUTED);

  textSize(14);


  text(
    "Numbers ऊपर डालो और SOLVE दबाओ.",
    30,
    top + 52
  );


  drawResult();
}


/* ================================================================
   RESULT
   ================================================================ */

function drawResult() {

  let y = 465;


  if (
    resultSteps.length === 0
  ) {

    fill(150);

    textAlign(
      CENTER,
      CENTER
    );

    textSize(17);


    text(
      "Solution यहाँ दिखाई देगा",
      width / 2,
      y
    );


    contentHeight =
      y + 100;

    return;
  }


  /* ============================================================
     FINAL ANSWER
     ============================================================ */

  fill(30);


  rect(
    15,
    y,
    width - 30,
    85,
    15
  );


  fill(255);

  textAlign(
    LEFT,
    CENTER
  );


  textSize(16);


  text(
    "FINAL ANSWER",
    30,
    y + 25
  );


  textSize(
    min(
      27,
      width * 0.07
    )
  );


  textStyle(BOLD);


  text(
    finalAnswer,
    30,
    y + 58
  );


  textStyle(NORMAL);


  /* ============================================================
     STEPS
     ============================================================ */

  let stepY =
    y + 110;


  for (
    let i = 0;
    i < resultSteps.length;
    i++
  ) {

    let step =
      resultSteps[i];


    let stepHeight =
      step.height ||
      80;


    fill(255);

    noStroke();


    rect(
      15,
      stepY,
      width - 30,
      stepHeight,
      12
    );


    /* NUMBER */

    fill(ACCENT);


    circle(
      40,
      stepY + 25,
      28
    );


    fill(255);


    textAlign(
      CENTER,
      CENTER
    );

    textSize(14);


    text(
      i + 1,
      40,
      stepY + 25
    );


    /* TITLE */

    fill(TEXT);


    textAlign(
      LEFT,
      TOP
    );

    textSize(16);

    textStyle(BOLD);


    text(
      step.title,
      62,
      stepY + 12
    );


    textStyle(NORMAL);


    /* LINES */

    fill(70);

    textSize(15);


    let lines =
      step.lines ||
      [];


    for (
      let j = 0;
      j < lines.length;
      j++
    ) {

      text(
        lines[j],
        62,
        stepY +
        38 +
        j * 21
      );
    }


    stepY +=
      stepHeight +
      10;
  }


  /*
     THIS IS IMPORTANT.

     Actual content height.
  */

  contentHeight =
    stepY + 120;


  updateScrollLimit();
}


/* ================================================================
   SCROLL LIMIT
   ================================================================ */

function updateScrollLimit() {

  let visibleTop = 135;

  let bottomPadding = 30;


  let maxScroll =
    max(
      0,
      contentHeight -
      (height - visibleTop) +
      bottomPadding
    );


  scrollY =
    constrain(
      scrollY,
      0,
      maxScroll
    );
}


/* ================================================================
   SOLVE
   ================================================================ */

function solve() {

  let a =
    inputA
      .value()
      .trim();


  let b =
    inputB
      .value()
      .trim();


  resultSteps = [];

  finalAnswer = "";

  scrollY = 0;


  if (
    a === "" ||
    b === ""
  ) {

    resultSteps.push({

      title:
        "Input Required",

      lines: [
        "दोनों numbers डालो."
      ],

      height: 75

    });

    return;
  }


  if (
    !isValidNumber(a) ||
    !isValidNumber(b)
  ) {

    resultSteps.push({

      title:
        "Invalid Number",

      lines: [

        "Valid number डालो।",

        "Example: 25, 2.5, 0.75, -4.25"

      ],

      height: 90

    });

    return;
  }


  if (
    operation === "addition"
  ) {

    solveAddition(
      a,
      b
    );
  }


  if (
    operation === "subtraction"
  ) {

    solveSubtraction(
      a,
      b
    );
  }


  if (
    operation === "multiplication"
  ) {

    solveMultiplication(
      a,
      b
    );
  }


  if (
    operation === "division"
  ) {

    solveDivision(
      a,
      b
    );
  }


  updateScrollLimit();
}


/* ================================================================
   VALIDATION
   ================================================================ */

function isValidNumber(
  value
) {

  return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)$/
    .test(value);
}


/* ================================================================
   DECIMAL PARSER
   ================================================================ */

function parseDecimal(
  value
) {

  value =
    value.trim();


  let negative =
    value.startsWith("-");


  value =
    value.replace(
      /^[+-]/,
      ""
    );


  let parts =
    value.split(".");


  let whole =
    parts[0] || "0";


  let fraction =
    parts[1] || "";


  let scale =
    fraction.length;


  let digits =
    whole + fraction;


  digits =
    digits.replace(
      /^0+(?=\d)/,
      ""
    );


  if (
    digits === ""
  )
    digits = "0";


  let integer =
    BigInt(digits);


  if (negative)
    integer = -integer;


  return {

    integer: integer,

    scale: scale

  };
}


/* ================================================================
   POWER 10
   ================================================================ */

function power10(n) {

  return (
    10n **
    BigInt(n)
  );
}


/* ================================================================
   ALIGN DECIMALS
   ================================================================ */

function alignDecimals(
  a,
  b
) {

  let A =
    parseDecimal(a);


  let B =
    parseDecimal(b);


  let scale =
    max(
      A.scale,
      B.scale
    );


  let integerA =
    A.integer *
    power10(
      scale -
      A.scale
    );


  let integerB =
    B.integer *
    power10(
      scale -
      B.scale
    );


  return {

    A: integerA,

    B: integerB,

    scale: scale

  };
}


/* ================================================================
   FORMAT DECIMAL
   ================================================================ */

function formatDecimal(
  integer,
  scale
) {

  if (
    scale === 0
  )
    return integer.toString();


  let negative =
    integer < 0n;


  if (negative)
    integer = -integer;


  let digits =
    integer.toString();


  while (
    digits.length <= scale
  ) {

    digits =
      "0" + digits;
  }


  let position =
    digits.length -
    scale;


  let whole =
    digits.slice(
      0,
      position
    );


  let fraction =
    digits.slice(
      position
    );


  fraction =
    fraction.replace(
      /0+$/,
      ""
    );


  let result =
    fraction.length > 0
      ? whole + "." + fraction
      : whole;


  if (
    result.startsWith(".")
  )
    result =
      "0" + result;


  if (negative)
    result =
      "-" + result;


  return result;
}


/* ================================================================
   ADDITION
   ================================================================ */

function solveAddition(
  a,
  b
) {

  let aligned =
    alignDecimals(
      a,
      b
    );


  let result =
    aligned.A +
    aligned.B;


  finalAnswer =
    formatDecimal(
      result,
      aligned.scale
    );


  let A =
    parseDecimal(a);


  let B =
    parseDecimal(b);


  let scale =
    aligned.scale;


  let displayA =
    formatDecimal(
      aligned.A,
      scale
    );


  let displayB =
    formatDecimal(
      aligned.B,
      scale
    );


  resultSteps.push({

    title:
      "Decimal points align करें",

    lines: [

      `  ${displayA}`,

      `+ ${displayB}`,

      "────────"

    ],

    height: 90

  });


  resultSteps.push({

    title:
      "Numbers को exact form में बदलें",

    lines: [

      `${a} → ${A.integer} / 10^${A.scale}`,

      `${b} → ${B.integer} / 10^${B.scale}`,

      "इससे decimal calculation exact रहती है।"

    ],

    height: 100

  });


  resultSteps.push({

    title:
      "Addition करें",

    lines: [

      `${aligned.A} + ${aligned.B} = ${result}`,

      `Decimal places = ${scale}`,

      `Result = ${finalAnswer}`

    ],

    height: 100

  });


  resultSteps.push({

    title:
      "Final Answer",

    lines: [

      `${a} + ${b} = ${finalAnswer}`

    ],

    height: 75

  });
}


/* ================================================================
   SUBTRACTION
   ================================================================ */

function solveSubtraction(
  a,
  b
) {

  let aligned =
    alignDecimals(
      a,
      b
    );


  let result =
    aligned.A -
    aligned.B;


  finalAnswer =
    formatDecimal(
      result,
      aligned.scale
    );


  let displayA =
    formatDecimal(
      aligned.A,
      aligned.scale
    );


  let displayB =
    formatDecimal(
      aligned.B,
      aligned.scale
    );


  resultSteps.push({

    title:
      "Decimal points align करें",

    lines: [

      `  ${displayA}`,

      `− ${displayB}`,

      "────────"

    ],

    height: 90

  });


  resultSteps.push({

    title:
      "Exact integer representation",

    lines: [

      `${aligned.A} − ${aligned.B}`,

      `= ${result}`

    ],

    height: 75

  });


  resultSteps.push({

    title:
      "Decimal places वापस लगाएँ",

    lines: [

      `Decimal places = ${aligned.scale}`,

      `${result} → ${finalAnswer}`

    ],

    height: 85

  });


  resultSteps.push({

    title:
      "Final Answer",

    lines: [

      `${a} − ${b} = ${finalAnswer}`

    ],

    height: 75

  });
}


/* ================================================================
   MULTIPLICATION
   ================================================================ */

function solveMultiplication(
  a,
  b
) {

  let A =
    parseDecimal(a);


  let B =
    parseDecimal(b);


  let result =
    A.integer *
    B.integer;


  let totalScale =
    A.scale +
    B.scale;


  finalAnswer =
    formatDecimal(
      result,
      totalScale
    );


  resultSteps.push({

    title:
      "Decimal points temporarily हटाएँ",

    lines: [

      `${a} → ${A.integer}`,

      `${b} → ${B.integer}`,

      "अब normal multiplication करेंगे।"

    ],

    height: 100

  });


  resultSteps.push({

    title:
      "Multiply करें",

    lines: [

      `${A.integer} × ${B.integer}`,

      `= ${result}`

    ],

    height: 80

  });


  resultSteps.push({

    title:
      "Decimal places count करें",

    lines: [

      `${a} में ${A.scale} decimal place`,

      `${b} में ${B.scale} decimal place`,

      `Total = ${totalScale} decimal places`

    ],

    height: 105

  });


  resultSteps.push({

    title:
      "Decimal वापस लगाएँ",

    lines: [

      `${result} → ${finalAnswer}`

    ],

    height: 75

  });


  resultSteps.push({

    title:
      "Final Answer",

    lines: [

      `${a} × ${b} = ${finalAnswer}`

    ],

    height: 75

  });
}


/* ================================================================
   LONG DIVISION
   ================================================================ */

function solveDivision(
  a,
  b
) {

  let A =
    parseDecimal(a);


  let B =
    parseDecimal(b);


  if (
    B.integer === 0n
  ) {

    finalAnswer =
      "Undefined";


    resultSteps.push({

      title:
        "Cannot divide by zero",

      lines: [

        "किसी भी number को 0 से divide नहीं किया जा सकता।"

      ],

      height: 90

    });


    return;
  }


  let numerator =
    A.integer;


  let denominator =
    B.integer;


  let scaleDifference =
    B.scale -
    A.scale;


  if (
    scaleDifference > 0
  ) {

    numerator *=
      power10(
        scaleDifference
      );

  } else if (
    scaleDifference < 0
  ) {

    denominator *=
      power10(
        -scaleDifference
      );
  }


  let negative =
    (
      numerator < 0n
    ) !== (
      denominator < 0n
    );


  let absNumerator =
    numerator < 0n
      ? -numerator
      : numerator;


  let absDenominator =
    denominator < 0n
      ? -denominator
      : denominator;


  let quotient =
    absNumerator /
    absDenominator;


  let remainder =
    absNumerator %
    absDenominator;


  resultSteps.push({

    title:
      "Division को exact form में बदलें",

    lines: [

      `${a} ÷ ${b}`,

      `Numerator = ${absNumerator}`,

      `Denominator = ${absDenominator}`

    ],

    height: 100

  });


  resultSteps.push({

    title:
      "Whole-number division",

    lines: [

      `${absNumerator} ÷ ${absDenominator}`,

      `Quotient = ${quotient}`,

      `Remainder = ${remainder}`

    ],

    height: 100

  });


  let decimalDigits = "";

  let workingRemainder =
    remainder;


  let maxDecimalPlaces =
    12;


  for (
    let i = 0;
    i < maxDecimalPlaces;
    i++
  ) {

    if (
      workingRemainder === 0n
    ) {

      break;
    }


    let oldRemainder =
      workingRemainder;


    workingRemainder *=
      10n;


    let digit =
      workingRemainder /
      absDenominator;


    workingRemainder %=
      absDenominator;


    decimalDigits +=
      digit.toString();


    resultSteps.push({

      title:
        `Decimal step ${i + 1}`,

      lines: [

        `Remainder = ${oldRemainder}`,

        `${oldRemainder} × 10 = ${oldRemainder * 10n}`,

        `${oldRemainder * 10n} ÷ ${absDenominator} = ${digit}`,

        `Decimal digit = ${digit}`

      ],

      height: 125

    });
  }


  let quotientString =
    quotient.toString();


  if (
    decimalDigits.length > 0
  ) {

    quotientString +=
      "." +
      decimalDigits;
  }


  quotientString =
    quotientString.replace(
      /(\.\d*?)0+$/,
      "$1"
    );


  if (
    quotientString.endsWith(".")
  ) {

    quotientString =
      quotientString.slice(
        0,
        -1
      );
  }


  if (negative) {

    quotientString =
      "-" +
      quotientString;
  }


  finalAnswer =
    quotientString;


  if (
    workingRemainder !== 0n
  ) {

    resultSteps.push({

      title:
        "Decimal approximation",

      lines: [

        "यह decimal expansion 12 places तक दिखाई गई है।",

        `Remainder अभी ${workingRemainder} है।`

      ],

      height: 90

    });
  }


  resultSteps.push({

    title:
      "Final Answer",

    lines: [

      `${a} ÷ ${b} = ${finalAnswer}`,

      remainder !== 0n
        ? `Original remainder = ${remainder}`
        : "Exact division"

    ],

    height: 90

  });
}


/* ================================================================
   CLEAR
   ================================================================ */

function clearAll() {

  inputA.value("");

  inputB.value("");

  resultSteps = [];

  finalAnswer = "";

  scrollY = 0;

  contentHeight = 0;
}


/* ================================================================
   OPERATION SELECTOR
   ================================================================ */

function mousePressed() {

  let labels = [

    "addition",

    "subtraction",

    "multiplication",

    "division"

  ];


  let x = 20;

  let y = 105;


  let w =
    min(
      75,
      (width - 50) / 4
    );


  let h = 35;


  for (
    let i = 0;
    i < 4;
    i++
  ) {

    if (

      mouseX >= x &&

      mouseX <= x + w &&

      mouseY >= y &&

      mouseY <= y + h

    ) {

      operation =
        labels[i];

      resultSteps = [];

      finalAnswer = "";

      scrollY = 0;

      updateScrollLimit();

      return false;
    }


    x += w + 8;
  }
}


/* ================================================================
   MOBILE TOUCH SCROLL
   ================================================================ */

function touchStarted() {

  /*
     Only start scrolling when the touch
     begins on the canvas area.

     Inputs and buttons are HTML elements,
     so they won't be affected.
  */

  if (
    mouseY > 135
  ) {

    lastTouchY =
      mouseY;

    isDragging = true;
  }


  return false;
}


/* ================================================================
   TOUCH MOVED
   ================================================================ */

function touchMoved() {

  if (!isDragging) {
    return true;
  }


  let currentY =
    mouseY;


  let delta =
    lastTouchY -
    currentY;


  /*
     Ignore extremely tiny movement.
  */

  if (
    abs(delta) > 0
  ) {

    scrollY +=
      delta;
  }


  updateScrollLimit();


  lastTouchY =
    currentY;


  return false;
}


/* ================================================================
   TOUCH ENDED
   ================================================================ */

function touchEnded() {

  isDragging = false;

  return false;
}


/* ================================================================
   MOUSE WHEEL
   ================================================================ */

function mouseWheel(
  event
) {

  /*
     Only scroll when the pointer
     is inside the canvas.
  */

  scrollY +=
    event.delta;


  updateScrollLimit();


  return false;
}


/* ================================================================
   SCROLL INDICATOR
   ================================================================ */

function drawScrollIndicator() {

  if (
    contentHeight <=
    height - 135
  ) {

    return;
  }


  let maxScroll =
    max(
      1,
      contentHeight -
      (height - 135)
    );


  let progress =
    scrollY /
    maxScroll;


  progress =
    constrain(
      progress,
      0,
      1
    );


  /*
     Scrollbar track
  */

  fill(
    210,
    210,
    210,
    150
  );


  rect(
    width - 8,
    140,
    4,
    height - 150,
    2
  );


  /*
     Scrollbar thumb
  */

  let trackHeight =
    height - 150;


  let barH =
    max(
      45,
      trackHeight *
      (
        trackHeight /
        contentHeight
      )
    );


  let y =
    140 +
    progress *
    (
      trackHeight -
      barH
    );


  fill(
    70,
    70,
    70,
    180
  );


  rect(
    width - 9,
    y,
    6,
    barH,
    3
  );
}
