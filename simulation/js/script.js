const data = [
  {
    step: 1,
    title:
      "Draw a horizontal line as the reference line for the isometric view, and draw a line perpendicular to it. ",
    questions: [
      {
        question: "How many views will be given in this experiment______?",
        options: ["1", "2", "3", "4"],
        answer: 1,
        buttonClass: "btnAxis",
      },
      {
        question:
          "An isometric view of any solid is drawn the angle between the edge of the cube and the horizontal will be______?",
        options: ["15 degrees", "120 degrees", "45 degrees", "30 degrees"],
        answer: 3,
        buttonClass: "btnVPHP",
      },
    ],
  },
  {
    step: 2,
    title:
      "From the intersection, draw a 30° line on either side of the perpendicular line, representing the base of the solid.",
    questions: [
      {
        question:
          "Which type of line in an isometric drawing is used to show edges that are not directly visible________?",
        options: ["Solid line", "Dashed line", "Dotted line", "Thick line"],
        answer: 1,
        buttonClass: "btnPyramid",
      },
    ],
  },
  {
    step: 3,
    title:
      "Mark the solid’s width, depth and height on the three lines intersecting at the reference line and extend lines parallel to the initially drawn lines, using the dimensions, i.e., width = 150mm, depth = 200mm and height = 96mm, to obtain the isometric box.",
    questions: [
      {
        question:
          "What are the views given in the experiment for converting into isometric view________?",
        options: [" Front, Side", "Front, Top", "Top , Side", "Top, Isometric"],
        answer: 1,
        buttonClass: "btnC",
      },
    ],
  },
  {
    step: 4,
    title:
      "Use the front and top views to mark the dimensions on the isometric box.",
    questions: [
      {
        question:
          "The lines parallel to isometric axes are called ___________ lines?",
        options: ["parallel", "auxiliary", "isometric", "oblique"],
        answer: 2,
        buttonClass: "btnB",
      },
    ],
  },
  {
    step: 5,
    title:
      "Use the front and top views to mark the dimensions on the isometric box.",
    questions: [
      {
        question: " Isometric view of rhombus will become__________?",
        options: ["parallelogram", "rhombus", "rectangle", "square"],
        answer: 0,
        buttonClass: "btnD",
      },
    ],
  },
  {
    step: 6,
    title: "Highlight the drawing",
    questions: [
      {
        question:
          "Which type of line in an isometric drawing is used to highlight the edges that are visible________?",
        options: ["Solid line", "Dashed line", "Dotted line", " Thick line"],
        answer: 3,
        buttonClass: "btnE",
      },
    ],
  },
  // {
  //   step: 7,
  //   title: "Draw the top view of pyramid whose axis makes α with VP",
  //   questions: [
  //     {
  //       question: "The Top view of an object is viewed on which plane________?",
  //       options: [
  //         "Horizontal Plane",
  //         "Parallel Plane",
  //         "Vertical Plane",
  //         "Profile Plane",
  //       ],
  //       answer: 0,
  //       buttonClass: "btnF",
  //     },
  //   ],
  // },
  // {
  //   step: 8,
  //   title: "Draw the final top view as required",
  //   questions: [
  //     {
  //       question: "The front view of an object is viewed on which plane________?",
  //       options: [
  //         "Horizontal Plane",
  //         "Parallel Plane",
  //         "Vertical Plane",
  //         "Profile Plane",
  //       ],
  //       answer: 2,
  //       buttonClass: "btnG",
  //     },
  //   ],
  // },
];
const quizDiv = document.querySelector(".quiz-div");
const questionDiv = document.querySelector(".question");
const answersDiv = document.querySelector(".answers");
const questionBtnDiv = document.querySelector(".question-btn");
const practiceDiv = document.querySelector(".practice");
const canvas = document.querySelector("#simscreen");
const ctx = canvas.getContext("2d");
let currentStepCount = 1;
let currentStep;
let currentQuestions;
let currentQuestionIndex = 0;

// stepNo & Step TITLE
const stepNumber = document.querySelector(".practice-step-no");
const stepTitle = document.querySelector(".practice-step-info");
const taskTitle = document.querySelector(".task-title");

// buttons
const btnAxis = document.querySelector(".btn-axis");
btnAxis.addEventListener("click", drawAxis);
const btnVPHP = document.querySelector(".btn-vp-hp");
btnVPHP.addEventListener("click", nameVPHP);
const btnPyramid = document.querySelector(".btn-pyramid");
btnPyramid.addEventListener("click", drawPyramid);
const btnA = document.querySelector(".btn-a");
btnA.addEventListener("click", () => a());
const btnC = document.querySelector(".btn-c");
btnC.addEventListener("click", () => b());
const btnB = document.querySelector(".btn-b");
btnB.addEventListener("click", () => c());
const btnD = document.querySelector(".btn-d");
btnD.addEventListener("click", () => d());
const btnE = document.querySelector(".btn-e");
btnE.addEventListener("click", () => e());
const btnF = document.querySelector(".btn-f");
btnF.addEventListener("click", () => f());
const btnG = document.querySelector(".btn-g");
btnG.addEventListener("click", () => g());
const btnNext = document.querySelector(".btn-next");
btnNext.addEventListener("click", nextStep);
const btnReset = document.querySelector(".btn-reset");
btnReset.addEventListener("click", resetAll);
const btnTop = document.querySelector(".btn-top");
btnTop.addEventListener("click", movetoTop);
const validateAnswer = document.createElement("span");
validateAnswer.classList.add("validate");

function displayDiv(ele) {
  const taskScreen = document.querySelectorAll(".task-screen");
  taskScreen.forEach((task) => {
    task.classList.add("hide");
  });
  if (ele.classList.contains("tool-objective")) {
    document.querySelector(".objective").classList.remove("hide");
    taskTitle.textContent = "Objective";
  }
  if (ele.classList.contains("tool-apparatus")) {
    document.querySelector(".apparatus").classList.remove("hide");
    taskTitle.textContent = "Apparatus";
  }
  if (ele.classList.contains("tool-practice")) {
    taskTitle.textContent = "Solution";
    document.querySelector(".practice").classList.remove("hide");
    if (currentStep === undefined) initialSetup();
  }
}

function nextStep() {
  currentStep = data.find((step) => currentStepCount === step.step);
  stepNumber.textContent = currentStepCount;
  stepTitle.textContent = currentStep.title;
  btnNext.setAttribute("disabled", true);
  btnNext.classList.remove("blink");
  initialSetup();
}

function nextQuestion() {
  if (currentQuestionIndex < currentQuestions.length - 1) {
    currentQuestionIndex += 1;
    displayQuestionDiv(currentQuestions[currentQuestionIndex]);
  } else {
    quizDiv.classList.add("hide");
    if (currentStepCount === data.length) {
      stepNumber.classList.add("hide");
      stepTitle.classList.add("hide");
      document.querySelector(".final-statement").classList.remove("hide");
      btnNext.classList.add("hide");
      btnNext.classList.remove("blink");
    } else {
      currentStepCount += 1;
      btnNext.removeAttribute("disabled");
      btnNext.classList.add("blink");
    }
  }
}

function canvas_arrow(context, fromx, fromy, tox, toy, r) {
  var x_center = tox;
  var y_center = toy;

  var angle;
  var x;
  var y;

  context.beginPath();

  angle = Math.atan2(toy - fromy, tox - fromx);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.moveTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.lineTo(x, y);

  angle += (1 / 3) * (2 * Math.PI);
  x = r * Math.cos(angle) + x_center;
  y = r * Math.sin(angle) + y_center;

  context.lineTo(x, y);

  context.closePath();

  context.fill();
}

function drawAxis() {
  btnAxis.classList.add("hide");
  var canvas = document.getElementById("simscreen");
  canvas.classList.remove("hide");

  canvas.scrollIntoView();
  btnTop.classList.remove("hide");
  // ctx.strokeStyle = "#B9B6B1";
  // animate(30, 250, 680, 250, 0, nameAxis);

  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.setLineDash([]);
  ctx.strokeStyle = "black";
  ctx.fillStyle = "black";
  ctx.font = "bold 18px Comic Sans MS"; // Increased font size slightly

  // Move to the starting point (0, 120)
  ctx.moveTo(0, 220 - 90); // Adjusted starting y-coordinate

  // Draw the first rectangle (Front view)
  ctx.fillText("Front view", 60, 122); // Adjusted text position
  ctx.lineTo(180, 220 - 90); // Adjusted x-coordinate
  ctx.lineTo(180, 316 - 90); // Adjusted x-coordinate
  ctx.lineTo(0, 316 - 90); // Adjusted y-coordinate
  ctx.lineTo(0, 220 - 90);
  // ctx.moveTo(0, 316 - 90); // Adjusted x-coordinate
  ctx.moveTo(120, 220 - 90); // Adjusted x-coordinate
  ctx.lineTo(120, 220 - 60); // Adjusted x-coordinate
  ctx.lineTo(120 - 60, 220 - 60); // Adjusted x-coordinate
  ctx.lineTo(120 - 60, 220 - 30); // Adjusted x-coordinate
  ctx.lineTo(0, 220 - 30); // Adjusted x-coordinate

  // Draw the second rectangle (Top view)
  ctx.moveTo(0, 230 + 20); // Adjusted starting y-coordinate
  ctx.fillText("Top view", 60, 242); // Adjusted text position
  ctx.lineTo(180, 230 + 20); // Adjusted x-coordinate
  ctx.lineTo(180, 430 + 20); // Adjusted y-coordinate
  ctx.lineTo(0, 430 + 20); // Adjusted y-coordinate
  ctx.lineTo(0, 302 + 20);
  ctx.lineTo(120, 302 + 20); // Adjusted x-coordinate
  ctx.lineTo(120, 430 + 20);
  ctx.lineTo(60, 430 + 20);
  ctx.lineTo(60, 302 + 20);
  ctx.lineTo(0, 302 + 20);
  ctx.lineTo(0, 230 + 20);
  ctx.stroke();
  ctx.closePath();

  // Draw additional lines and arrows
  ctx.beginPath();
  ctx.strokeStyle = "blue";

  // Adjusted coordinates for arrows, moved 40 units left
  ctx.moveTo(215, 135);
  ctx.lineTo(215, 220);
  ctx.stroke();
  ctx.moveTo(195, 220);
  ctx.lineTo(195, 200);
  ctx.stroke();
  ctx.moveTo(215, 445);
  ctx.lineTo(215, 255);
  ctx.stroke();
  ctx.moveTo(195, 316);
  ctx.lineTo(195, 255);
  ctx.stroke();
  ctx.moveTo(195, 130);
  ctx.lineTo(195, 160);
  ctx.stroke();

  // Draw more lines
  ctx.moveTo(54, 470);
  ctx.lineTo(14, 470);
  ctx.stroke();
  ctx.moveTo(54, 470);
  ctx.lineTo(114, 470);
  ctx.stroke();
  ctx.moveTo(174, 487);
  ctx.lineTo(14, 487);
  ctx.stroke();

  // Draw arrows with canvas_arrow function
  ctx.fillStyle = "orange";
  canvas_arrow(ctx, 215, 120, 215, 220, 5);
  canvas_arrow(ctx, 215, 220, 215, 135, 5);
  canvas_arrow(ctx, 195, 210, 195, 220, 5);
  canvas_arrow(ctx, 195, 210, 195, 200, 5);
  canvas_arrow(ctx, 215, 250, 215, 445, 5);
  canvas_arrow(ctx, 215, 430, 215, 255, 5);
  canvas_arrow(ctx, 195, 245, 195, 316, 5);
  canvas_arrow(ctx, 195, 275, 195, 255, 5);
  canvas_arrow(ctx, 195, 130, 195, 160, 5);
  canvas_arrow(ctx, 195, 160, 195, 130, 5);
  // canvas_arrow(ctx, 195, 130, 195, 190, 5);
  canvas_arrow(ctx, 20, 470, 54, 470, 5);
  canvas_arrow(ctx, 54, 470, 14, 470, 5);
  canvas_arrow(ctx, 54, 470, 114, 470, 5);
  canvas_arrow(ctx, 114, 470, 74, 470, 5);
  canvas_arrow(ctx, 14, 487, 174, 487, 5);
  canvas_arrow(ctx, 174, 487, 14, 487, 5);

  // Draw circles
  ctx.beginPath();
  ctx.moveTo(620, 22); // Adjusted coordinates for circles
  ctx.arc(620, 22, 9, 0, 2 * Math.PI);
  ctx.fillStyle = "#3590ae";
  ctx.fill();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(620, 45); // Adjusted coordinates for circles
  ctx.arc(620, 42, 9, 0, 2 * Math.PI);
  ctx.fillStyle = "#ae8e6e";
  ctx.fill();
  ctx.closePath();

  // Draw additional text
  ctx.font = "bold 14px Arial"; // Adjusted font size
  ctx.fillText("Solid lines", 635, 25); // Adjusted text position
  ctx.fillText("Projection lines", 635, 45); // Adjusted text position
  ctx.fillText("50", 29, 465); // Adjusted text position
  ctx.fillText("50", 78, 465); // Adjusted text position
  ctx.fillText("150", 80, 484); // Adjusted text position

  // Draw rotated text
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(190, 164);
  ctx.rotate(Math.PI / 2);
  ctx.fillText("96", 2, -11);
  ctx.restore();

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(190, 330);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("200", 2, 16);
  ctx.restore();

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(170, 270);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("72", -10, 18);
  ctx.restore();

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(170, 190);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("32", -19, 18);
  ctx.restore();

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.translate(170, 130);
  ctx.rotate(-Math.PI / 2);
  ctx.fillText("32", -19, 18);
  ctx.restore();

  nextQuestion();
}

function nameAxis() {
  ctx.font = "bold 20px Nunito sans MS";
  ctx.fillText("X", 10, 255);
  ctx.fillText("Y", 690, 255);

  btnAxis.classList.add("hide");

  // var cvs = document.getElementsByTagName("canvas")[0];
  // var ctx = cvs.getContext("2d");
  // document.getElementById("b").style.visibility = "hidden";
  // nextButtonId = "d";
  // //   document.getElementById("d").style.visibility = "visible";
  // document.getElementById("stepnumber").innerHTML = "&nbsp;4&nbsp;";
  // document.getElementById("text").innerHTML =
  //   "Transfer the top view to the isometric view";
  // document.getElementById("c").style.visibility = "hidden";
  // ctx.beginPath();

  // ctx.strokeStyle = "#3590ae";
  // ctx.lineWidth = 1;
  // animate(
  //   450,
  //   400 - 32,
  //   450 + 50 * Math.cos(Math.PI / 6),
  //   400 - 32 - 50 * Math.sin(Math.PI / 6)
  // );
  // animate(
  //   450 + 50 * Math.cos(Math.PI / 6),
  //   400 - 32 - 50 * Math.sin(Math.PI / 6),
  //   450 + 50 * Math.cos(Math.PI / 6),
  //   400 - 32 - 32 - 50 * Math.sin(Math.PI / 6)
  // );
  // animate(
  //   450 + 50 * Math.cos(Math.PI / 6),
  //   400 - 32 - 32 - 50 * Math.sin(Math.PI / 6),
  //   450 + 100 * Math.cos(Math.PI / 6),
  //   400 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
  // );
  // animate(
  //   450 + 100 * Math.cos(Math.PI / 6),
  //   400 - 32 - 32 - 100 * Math.sin(Math.PI / 6),
  //   450 + 100 * Math.cos(Math.PI / 6),
  //   400 - 32 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
  // );
  // ctx.closePath();
}

// function updateStepTitle(newTitle, newStepNumber) {
//   // Update the title in the data structure
//   const stepIndex = data.findIndex(step => step.step === currentStepCount);
//   if (stepIndex !== -1) {
//     data[stepIndex].title = newTitle;
//   }

//   // Update the title in the DOM
//   stepTitle.textContent = newTitle;
//   stepNumber.textContent = newStepNumber;
// }

function nameVPHP() {
  // currentStepCount = 2;
  // updateStepTitle("Draw the desired outline of the project",currentStepCount);
  // btnAxis.classList.add("hide");
  // nextQuestion();
  // var ctx = cvs.getContext("2d");
  ctx.fillStyle = "black";

  ctx.font = "bold 14px Comic Sans MS";
  ctx.fillText("VP", 250, 380);
  ctx.fillText("HP", 250, 420);
  ctx.fillText("X", 220, 405);
  ctx.fillText("Y", 660, 405);
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.moveTo(230, 400);
  ctx.lineTo(650, 400);
  ctx.stroke();
  ctx.moveTo(450, 400);
  ctx.font = "bold 12px Arial";

  ctx.fillText("30°", 500, 390);
  ctx.fillText("30°", 380, 390);
  ctx.arc(450, 400, 40, -Math.PI / 6, 0);
  ctx.stroke();
  ctx.arc(450, 400, 40, Math.PI, Math.PI + Math.PI / 6);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#3590ae";
  animate(
    450,
    400,
    450 - 200 * Math.cos(Math.PI / 6),
    400 - 200 * Math.sin(Math.PI / 6)
  );
  animate(
    450,
    400,
    450 + 150 * Math.cos(Math.PI / 6),
    400 - 150 * Math.sin(Math.PI / 6)
  );
  animate(450, 400, 450, 400 - 32);
  nextButtonId = "c";
  //   document.getElementById("c").style.visibility = "visible";
  ctx.closePath();

  btnVPHP.classList.add("hide");
  nextQuestion();
}

function drawLine(x1, y1, x2, y2, ratio) {
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.moveTo(x1, y1);
  x2 = x1 + ratio * (x2 - x1);
  y2 = y1 + ratio * (y2 - y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

function animate(x1, y1, x2, y2, ratio, cb) {
  ratio = ratio || 0;
  drawLine(x1, y1, x2, y2, ratio, cb);
  if (ratio > 1) {
    // cb();
  } else if (ratio < 1) {
    animationStatus = true;
    requestAnimationFrame(function () {
      animate(x1, y1, x2, y2, ratio + 0.02, cb);
    });
  }
}
// function animate(x1, y1, x2, y2, ratio) {
//   ratio = ratio || 0;
//   drawLine(x1, y1, x2, y2, ratio);
//   if (ratio < 1) {
//     requestAnimationFrame(function () {
//       animate(x1, y1, x2, y2, ratio + 0.02);
//     });
//   }
// }

function animateRecursively(x1, y1, x2, y2, ratio) {
  ratio = ratio || 0;
  drawLine(x1, y1, x2, y2, ratio);
  if (ratio < 1) {
    animationStatus = true;
    requestAnimationFrame(function () {
      animateRecursively(x1, y1, x2, y2, ratio + 0.02);
    });
  }
}

function initialSetup() {
  currentStep = data.find((d) => d.step == currentStepCount);
  stepNumber.textContent = currentStepCount;
  stepTitle.textContent = currentStep.title;
  currentQuestions = currentStep.questions;
  currentQuestionIndex = 0;
  quizDiv.classList.remove("hide");
  displayQuestionDiv(currentQuestions[currentQuestionIndex]);
}

function displayQuestionDiv(questions) {
  const { question, options, answer, buttonClass } = questions;
  questionDiv.innerHTML = `${currentQuestionIndex + 1}. ${question}`;
  answersDiv.innerHTML = "";
  options.map((option, index) => {
    answersDiv.innerHTML += `
    <div class="input-group">
    <input type="radio" name="${question}" id="ans${index}" class="option" onchange='checkAnswer(this, ${index}, ${answer}, ${buttonClass})'>
    <label for="rad1">${option}</label>
  </div>
    `;
  });
}

function checkAnswer(ele, index, answer, buttonClass) {
  const optionSelected = ele.parentNode;
  optionSelected.classList.remove("wrong");
  optionSelected.classList.remove("correct");
  if (index === answer) {
    optionSelected.classList.add("correct");
    buttonClass.classList.add("anim");
    buttonClass.classList.remove("hide");
    validateAnswer.innerHTML = "Right answer👍";
    answersDiv.appendChild(validateAnswer);
  } else {
    optionSelected.classList.add("wrong");
    buttonClass.classList.remove("anim");
    buttonClass.classList.add("hide");
    validateAnswer.innerHTML = "Wrong answer, please check the options again👎";
    answersDiv.appendChild(validateAnswer);
  }
}
function resetAll() {
  ctx.clearRect(0, 0, 750, 500);
  currentStepCount = 1;
  currentStep;
  currentQuestions;
  currentQuestionIndex = 0;
  initialSetup();
  document.querySelectorAll(".btn").forEach((b) => b.classList.add("hide"));
  btnNext.setAttribute("disabled", true);
  btnNext.classList.remove("hide");
  btnReset.classList.remove("hide");
  stepNumber.classList.remove("hide");
  stepTitle.classList.remove("hide");
  document.querySelector(".final-statement").classList.add("hide");
  canvas.classList.add("hide");
}

function movetoTop() {
  practiceDiv.scrollIntoView();
}

function drawPyramid() {
  var canvas = document.getElementById("simscreen");
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.strokeStyle = "#3590ae";
  ctx.lineWidth = 10;

  animate(
    450 - 200 * Math.cos(Math.PI / 6),
    400 - 200 * Math.sin(Math.PI / 6),
    450 - 200 * Math.cos(Math.PI / 6),
    400 - 200 * Math.sin(Math.PI / 6) - 96
  );

  animate(
    450 + 150 * Math.cos(Math.PI / 6),
    400 - 150 * Math.sin(Math.PI / 6),
    450 + 150 * Math.cos(Math.PI / 6),
    400 - 150 * Math.sin(Math.PI / 6) - 96
  );

  animate(
    450 + 150 * Math.cos(Math.PI / 6),
    304 - 150 * Math.sin(Math.PI / 6),
    450 + 100 * Math.cos(Math.PI / 6),
    304 - 100 * Math.sin(Math.PI / 6)
  );

  animate(
    450 - 200 * Math.cos(Math.PI / 6),
    304 - 200 * Math.sin(Math.PI / 6),
    450 - 128 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6)
  );

  animate(
    450 + 150 * Math.cos(Math.PI / 6),
    400 - 150 * Math.sin(Math.PI / 6) - 96,
    450 + 150 * Math.cos(Math.PI / 6) - 200 * Math.cos(Math.PI / 6),
    400 - 150 * Math.sin(Math.PI / 6) - 96 - 200 * Math.sin(Math.PI / 6)
  );

  animate(
    450 - 200 * Math.cos(Math.PI / 6),
    400 - 200 * Math.sin(Math.PI / 6) - 96,
    450 + 150 * Math.cos(Math.PI / 6) - 200 * Math.cos(Math.PI / 6),
    400 - 150 * Math.sin(Math.PI / 6) - 96 - 200 * Math.sin(Math.PI / 6)
  );

  ctx.closePath();

  // Adjusted to hide the correct button based on your HTML structure
  var btnPyramid = document.querySelector(".btn.btn-pyramid");
  btnPyramid.classList.add("hide");

  nextQuestion();
}

function a() {
  ctx.fillStyle = "black";
  ctx.fillText("a'(e')", 70, 240);
  ctx.fillText("d'(b')", 185, 240);
  ctx.beginPath();
  ctx.strokeStyle = "#3590ae";
  ctx.moveTo(100, 250);
  ctx.lineTo(175, 250);
  ctx.lineTo(137, 100);
  ctx.lineTo(100, 250);
  ctx.stroke();
  ctx.setLineDash([5, 10]);
  ctx.moveTo(137, 250);
  ctx.lineTo(137, 100);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.strokeStyle = "#d9b28a";
  ctx.setLineDash([]);
  animateRecursively(100, 250, 100, 300, 0);
  animateRecursively(137, 250, 137, 337, 0);
  animateRecursively(175, 250, 175, 300, 0);
  ctx.closePath();
  btnA.classList.add("hide");
  nextQuestion();
}

function b() {
  ctx.strokeStyle = "#3590ae";
  ctx.lineWidth = 1;
  animate(
    450,
    400 - 32,
    450 + 50 * Math.cos(Math.PI / 6),
    400 - 32 - 50 * Math.sin(Math.PI / 6)
  );
  animate(
    450 + 50 * Math.cos(Math.PI / 6),
    400 - 32 - 50 * Math.sin(Math.PI / 6),
    450 + 50 * Math.cos(Math.PI / 6),
    400 - 32 - 32 - 50 * Math.sin(Math.PI / 6)
  );
  animate(
    450 + 50 * Math.cos(Math.PI / 6),
    400 - 32 - 32 - 50 * Math.sin(Math.PI / 6),
    450 + 100 * Math.cos(Math.PI / 6),
    400 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
  );
  animate(
    450 + 100 * Math.cos(Math.PI / 6),
    400 - 32 - 32 - 100 * Math.sin(Math.PI / 6),
    450 + 100 * Math.cos(Math.PI / 6),
    400 - 32 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
  );
  ctx.closePath();
  btnC.classList.add("hide");
  nextQuestion();
}

// function updateStepTitle1(newTitle, newStepNumber) {
//   // Update the title in the data structure
//   const stepIndex = data.findIndex(step => step.step === currentStepCount);
//   if (stepIndex !== -1) {
//     data[stepIndex].title = newTitle;
//   }

//   // Update the title and step number in the DOM
//   stepTitle.textContent = newTitle;
//   stepNumber.textContent = newStepNumber;
// }

function c() {
  // currentStepCount = 3;
  // updateStepTitle1("Draw the desired outline of the project", currentStepCount);
  ctx.strokeStyle = "#3590ae";
  ctx.lineWidth = 2;
  animate(
    450 + 100 * Math.cos(Math.PI / 6),
    304 - 100 * Math.sin(Math.PI / 6),
    450 - 28 * Math.cos(Math.PI / 6),
    304 - 228 * Math.sin(Math.PI / 6)
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6),
    450 - 28 * Math.cos(Math.PI / 6),
    304 - 228 * Math.sin(Math.PI / 6)
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6),
    450 - 128 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64,
    450,
    400 - 32
  );
  ctx.closePath();
  btnB.classList.add("hide");
  nextQuestion();
}

function d() {
  ctx.beginPath();
  ctx.strokeStyle = "#d9b28a";
  animate(
    450 - 128 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64,
    450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6)
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6),
    450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6) - 32
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6) - 32,
    450 - 128 * Math.cos(Math.PI / 6) + 100 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 100 * Math.sin(Math.PI / 6) - 32
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6) + 100 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 100 * Math.sin(Math.PI / 6) - 32,
    450 - 28 * Math.cos(Math.PI / 6),
    304 - 228 * Math.sin(Math.PI / 6)
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6),
    450 + 50 * Math.cos(Math.PI / 6),
    400 - 32 - 50 * Math.sin(Math.PI / 6)
  );
  animate(
    450 + 50 * Math.cos(Math.PI / 6),
    400 - 32 - 50 * Math.sin(Math.PI / 6) - 32,
    450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6) - 32
  );
  animate(
    450 - 128 * Math.cos(Math.PI / 6) + 100 * Math.cos(Math.PI / 6),
    304 - 128 * Math.sin(Math.PI / 6) + 64 - 100 * Math.sin(Math.PI / 6) - 32,
    450 + 100 * Math.cos(Math.PI / 6),
    400 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
  );

  ctx.closePath();
  btnD.classList.add("hide");
  nextQuestion();
}

function e() {
  var canvas = document.getElementById("simscreen");
  var ctx = canvas.getContext("2d");

  ctx.beginPath();
  ctx.strokeStyle = "#3590ae";
  ctx.lineWidth = 4.5; // Set initial line width

  // Define the sequence of animations using setTimeout for a smooth animation effect
  animateWithDelay(
    ctx,
    450 - 200 * Math.cos(Math.PI / 6),
    400 - 200 * Math.sin(Math.PI / 6),
    450 - 200 * Math.cos(Math.PI / 6),
    400 - 200 * Math.sin(Math.PI / 6) - 96,
    5 // Line width for this segment
  );

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 + 150 * Math.cos(Math.PI / 6),
      400 - 150 * Math.sin(Math.PI / 6),
      450 + 150 * Math.cos(Math.PI / 6),
      400 - 150 * Math.sin(Math.PI / 6) - 96,
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450,
      400 - 32,
      450 + 50 * Math.cos(Math.PI / 6),
      400 - 32 - 50 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 - 128 * Math.cos(Math.PI / 6),
      304 - 128 * Math.sin(Math.PI / 6),
      450 - 200 * Math.cos(Math.PI / 6),
      304 - 200 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 + 100 * Math.cos(Math.PI / 6),
      304 - 100 * Math.sin(Math.PI / 6),
      450 + 150 * Math.cos(Math.PI / 6),
      304 - 150 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 + 50 * Math.cos(Math.PI / 6),
      400 - 32 - 50 * Math.sin(Math.PI / 6),
      450 + 50 * Math.cos(Math.PI / 6),
      400 - 32 - 32 - 50 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 + 50 * Math.cos(Math.PI / 6),
      400 - 32 - 32 - 50 * Math.sin(Math.PI / 6),
      450 + 100 * Math.cos(Math.PI / 6),
      400 - 32 - 32 - 100 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 + 100 * Math.cos(Math.PI / 6),
      400 - 32 - 32 - 100 * Math.sin(Math.PI / 6),
      450 + 100 * Math.cos(Math.PI / 6),
      400 - 32 - 32 - 32 - 100 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 + 150 * Math.cos(Math.PI / 6),
      400 - 150 * Math.sin(Math.PI / 6) - 96,
      450 + 150 * Math.cos(Math.PI / 6) - 200 * Math.cos(Math.PI / 6),
      400 - 150 * Math.sin(Math.PI / 6) - 96 - 200 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 - 200 * Math.cos(Math.PI / 6),
      400 - 200 * Math.sin(Math.PI / 6) - 96,
      450 + 150 * Math.cos(Math.PI / 6) - 200 * Math.cos(Math.PI / 6),
      400 - 150 * Math.sin(Math.PI / 6) - 96 - 200 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450,
      400,
      450 - 200 * Math.cos(Math.PI / 6),
      400 - 200 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450,
      400,
      450 + 150 * Math.cos(Math.PI / 6),
      400 - 150 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 + 100 * Math.cos(Math.PI / 6),
      304 - 100 * Math.sin(Math.PI / 6),
      450 - 28 * Math.cos(Math.PI / 6),
      304 - 228 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 - 128 * Math.cos(Math.PI / 6),
      304 - 128 * Math.sin(Math.PI / 6),
      450 - 28 * Math.cos(Math.PI / 6),
      304 - 228 * Math.sin(Math.PI / 6),
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 - 128 * Math.cos(Math.PI / 6),
      304 - 128 * Math.sin(Math.PI / 6),
      450 - 128 * Math.cos(Math.PI / 6),
      304 - 128 * Math.sin(Math.PI / 6) + 64,
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450 - 128 * Math.cos(Math.PI / 6),
      304 - 128 * Math.sin(Math.PI / 6) + 64,
      450,
      400 - 32,
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  setTimeout(function () {
    animateWithDelay(
      ctx,
      450,
      400,
      450,
      400 - 32,
      5 // Line width for this segment
    );
  }, 150); // Delay for animation

  ctx.closePath();

  // Adjusted to hide the correct button based on your HTML structure
  var btnE = document.querySelector(".btn.btn-e");
  btnE.classList.add("hide");

  // Show final statement and hide unnecessary elements
  var finalStatement = document.querySelector(".final-statement");
  finalStatement.classList.remove("hide");

  var practiceStep = document.querySelector(".practice-step-no");
  practiceStep.classList.add("hide");

  var practiceStepInfo = document.querySelector(".practice-step-info");
  practiceStepInfo.classList.add("hide");

  var btnNext = document.querySelector(".btn-next");
  btnNext.classList.add("hide");

  quizDiv.classList.add("hide");
}

function animateWithDelay(ctx, x1, y1, x2, y2, lineWidth) {
  var steps = 100; // Number of animation steps
  var currentStep = 0;

  var dx = (x2 - x1) / steps;
  var dy = (y2 - y1) / steps;

  var animateInterval = setInterval(function () {
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.moveTo(x1 + dx * currentStep, y1 + dy * currentStep);
    ctx.lineTo(x1 + dx * (currentStep + 1), y1 + dy * (currentStep + 1));
    ctx.stroke();
    ctx.closePath();

    currentStep++;

    if (currentStep === steps) {
      clearInterval(animateInterval);
    }
  }, 8); // Animation speed: lower value for smoother animation
}

// function f() {
//   ctx.beginPath();
//   ctx.strokeStyle = "#d9b28a";
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64,
//     450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6),
//     450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6) - 32
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6) - 32,
//     450 - 128 * Math.cos(Math.PI / 6) + 100 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 100 * Math.sin(Math.PI / 6) - 32
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6) + 100 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 100 * Math.sin(Math.PI / 6) - 32,
//     450 - 28 * Math.cos(Math.PI / 6),
//     304 - 228 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6),
//     450 + 50 * Math.cos(Math.PI / 6),
//     400 - 32 - 50 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 + 50 * Math.cos(Math.PI / 6),
//     400 - 32 - 50 * Math.sin(Math.PI / 6) - 32,
//     450 - 128 * Math.cos(Math.PI / 6) + 50 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 50 * Math.sin(Math.PI / 6) - 32
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6) + 100 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64 - 100 * Math.sin(Math.PI / 6) - 32,
//     450 + 100 * Math.cos(Math.PI / 6),
//     400 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
//   );
//   ctx.closePath();
//   btnF.classList.add("hide");
//   nextQuestion();
// }

// function g() {
//   ctx.beginPath();
//   ctx.strokeStyle = "#3590ae";
//   ctx.lineWidth = 2.5;
//   animate(
//     450 - 200 * Math.cos(Math.PI / 6),
//     400 - 200 * Math.sin(Math.PI / 6),
//     450 - 200 * Math.cos(Math.PI / 6),
//     400 - 200 * Math.sin(Math.PI / 6) - 96
//   );
//   animate(
//     450 + 150 * Math.cos(Math.PI / 6),
//     400 - 150 * Math.sin(Math.PI / 6),
//     450 + 150 * Math.cos(Math.PI / 6),
//     400 - 150 * Math.sin(Math.PI / 6) - 96
//   );
//   animate(
//     450,
//     400 - 32,
//     450 + 50 * Math.cos(Math.PI / 6),
//     400 - 32 - 50 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6),
//     450 - 200 * Math.cos(Math.PI / 6),
//     304 - 200 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 + 100 * Math.cos(Math.PI / 6),
//     304 - 100 * Math.sin(Math.PI / 6),
//     450 + 150 * Math.cos(Math.PI / 6),
//     304 - 150 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 + 50 * Math.cos(Math.PI / 6),
//     400 - 32 - 50 * Math.sin(Math.PI / 6),
//     450 + 50 * Math.cos(Math.PI / 6),
//     400 - 32 - 32 - 50 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 + 50 * Math.cos(Math.PI / 6),
//     400 - 32 - 32 - 50 * Math.sin(Math.PI / 6),
//     450 + 100 * Math.cos(Math.PI / 6),
//     400 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 + 100 * Math.cos(Math.PI / 6),
//     400 - 32 - 32 - 100 * Math.sin(Math.PI / 6),
//     450 + 100 * Math.cos(Math.PI / 6),
//     400 - 32 - 32 - 32 - 100 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 + 150 * Math.cos(Math.PI / 6),
//     400 - 150 * Math.sin(Math.PI / 6) - 96,
//     450 + 150 * Math.cos(Math.PI / 6) - 200 * Math.cos(Math.PI / 6),
//     400 - 150 * Math.sin(Math.PI / 6) - 96 - 200 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 - 200 * Math.cos(Math.PI / 6),
//     400 - 200 * Math.sin(Math.PI / 6) - 96,
//     450 + 150 * Math.cos(Math.PI / 6) - 200 * Math.cos(Math.PI / 6),
//     400 - 150 * Math.sin(Math.PI / 6) - 96 - 200 * Math.sin(Math.PI / 6)
//   );
//   document.getElementById("f").style.animation = "none";
//   animate(
//     450,
//     400,
//     450 - 200 * Math.cos(Math.PI / 6),
//     400 - 200 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450,
//     400,
//     450 + 150 * Math.cos(Math.PI / 6),
//     400 - 150 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 + 100 * Math.cos(Math.PI / 6),
//     304 - 100 * Math.sin(Math.PI / 6),
//     450 - 28 * Math.cos(Math.PI / 6),
//     304 - 228 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6),
//     450 - 28 * Math.cos(Math.PI / 6),
//     304 - 228 * Math.sin(Math.PI / 6)
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6),
//     450 - 128 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64
//   );
//   animate(
//     450 - 128 * Math.cos(Math.PI / 6),
//     304 - 128 * Math.sin(Math.PI / 6) + 64,
//     450,
//     400 - 32
//   );
//   animate(450, 400, 450, 400 - 32);
//   btnG.classList.add("hide");
//   nextQuestion();
// }
