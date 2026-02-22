// ============================================================
//  content.js  —  ALL course content lives here
//  To add a new topic: append a new object to the TOPICS array.
//  No other file needs to change.
// ============================================================

const TOPICS = [
  // ─────────────────────────────────────────────────────────
  //  TOPIC 1: Git Basics
  // ─────────────────────────────────────────────────────────
  {
    id: "git-basics",
    title: "Git Basics",
    icon: "🔀",
    color: "#7c3aed",          // accent color for this topic card
    description: "Learn the fundamentals of version control with Git — track changes, collaborate with others, and manage your codebase like a pro.",
    difficulty: "Beginner",
    estimatedTime: "25 min",
    tags: ["DevOps", "Tools"],
    sections: [
      // ── Lesson 1 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "What is Version Control?",
        content: `
          <p>Imagine you're writing an essay and you keep saving copies like <code>essay_v1.doc</code>, <code>essay_v2.doc</code>, <code>essay_FINAL.doc</code>, <code>essay_FINAL_v2.doc</code>... 😅 That's manual version control — and it's messy.</p>
          <p><strong>Version control</strong> is a system that tracks changes to files over time, so you can:</p>
          <ul>
            <li>📂 See <em>what</em> changed, <em>when</em>, and <em>who</em> made the change</li>
            <li>⏪ Revert to any earlier version instantly</li>
            <li>🤝 Work with a team without overwriting each other's work</li>
            <li>🌿 Experiment safely in separate "branches" without breaking the main code</li>
          </ul>
          <div class="callout callout-info">
            <strong>💡 Think of it like Google Docs history</strong> — but for code, and incredibly powerful.
          </div>
          <h3>Why Git Specifically?</h3>
          <p>Git is the most widely used version control system in the world. Created by <strong>Linus Torvalds</strong> (the same person who created Linux) in 2005, it's fast, distributed, and free.</p>
          <p><strong>Distributed</strong> means every developer has the full history of the project on their own computer — not just the latest snapshot. This makes Git resilient and great for offline work.</p>
        `
      },
      // ── Lesson 2 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Git vs GitHub — Not the Same Thing!",
        content: `
          <p>One of the most common beginner confusions is treating Git and GitHub as the same thing. They're not!</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Git</th><th>GitHub</th></tr></thead>
              <tbody>
                <tr><td>A tool installed on your computer</td><td>A website / cloud service</td></tr>
                <tr><td>Tracks versions locally</td><td>Hosts your Git repos online</td></tr>
                <tr><td>Works without the internet</td><td>Requires an internet connection</td></tr>
                <tr><td>Free and open source</td><td>Free tier + paid plans</td></tr>
                <tr><td>Command-line tool</td><td>Web UI + integrations</td></tr>
              </tbody>
            </table>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Analogy:</strong> Git is like a camera that takes photos. GitHub is like Instagram — a place to share and store those photos online. You can use the camera without Instagram, but sharing is easier with it.
          </div>
          <p>Other platforms like <strong>GitLab</strong> and <strong>Bitbucket</strong> serve a similar purpose to GitHub. Git works with all of them.</p>
        `
      },
      // ── Quiz 1 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "⚡ Quick Check #1",
        questions: [
          {
            q: "What does 'distributed' mean in the context of Git?",
            options: [
              "The code is split across multiple files",
              "Every developer has the full project history locally",
              "Git is distributed for free",
              "The team is distributed across time zones"
            ],
            answer: 1,
            explanation: "In a distributed system, everyone has the complete repository — including all history — on their own machine. This makes Git fast and resilient."
          },
          {
            q: "Which of these statements is TRUE?",
            options: [
              "Git and GitHub are the same thing",
              "You need GitHub to use Git",
              "Git is a tool; GitHub is a hosting platform",
              "GitHub created Git"
            ],
            answer: 2,
            explanation: "Git is the version control tool (created by Linus Torvalds), while GitHub is one of many platforms that host Git repositories online."
          },
          {
            q: "What was one major problem with saving files like 'essay_FINAL_v2.doc'?",
            options: [
              "Files take up too much space",
              "It's hard to know what changed between versions",
              "You can't share those files",
              "Filenames can't contain underscores"
            ],
            answer: 1,
            explanation: "Manual version naming gives you snapshots but no easy way to see exactly what changed, who changed it, or why. Git solves all of this."
          }
        ]
      },
      // ── Lesson 3 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Core Git Commands",
        content: `
          <p>Let's walk through the essential Git workflow, command by command.</p>
          <h3>🚀 Starting a Repository</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>git init</code></pre>
          </div>
          <p>This creates a hidden <code>.git</code> folder in your project — that's where Git stores the entire history. Run this once per project.</p>
          <h3>📸 The Three-Stage Workflow</h3>
          <p>Every change in Git goes through 3 stages:</p>
          <div class="stages">
            <div class="stage"><span class="stage-num">1</span><strong>Working Directory</strong><br>Files you're editing right now</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">2</span><strong>Staging Area</strong><br>Changes you've selected to save</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">3</span><strong>Repository</strong><br>Permanently saved snapshots</div>
          </div>
          <h3>📋 Stage & Save Changes</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>git add filename.txt   # stage a specific file
git add .             # stage ALL changed files
git commit -m "Add login page"  # save snapshot with a message</code></pre>
          </div>
          <h3>☁️ Sync with Remote</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>git remote add origin https://github.com/you/repo.git
git push origin main   # upload your commits to GitHub</code></pre>
          </div>
          <h3>📥 Get Others' Changes</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>git pull origin main   # download and merge latest changes</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>💡 Pro tip:</strong> Run <code>git status</code> anytime to see what's changed, what's staged, and what's not tracked yet.
          </div>
        `
      },
      // ── Lesson 4 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Branching & Merging",
        content: `
          <p>Branches are one of Git's superpowers. They let you work on new features or fixes in <strong>complete isolation</strong> from your stable code.</p>
          <h3>🌿 Creating & Switching Branches</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>git branch feature/login    # create a new branch
git checkout feature/login  # switch to it
# or shortcut:
git checkout -b feature/login</code></pre>
          </div>
          <p>Now any commits you make only go on <code>feature/login</code>. Your <code>main</code> branch stays clean and untouched.</p>
          <h3>🔗 Merging Back</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>git checkout main           # go back to main
git merge feature/login     # bring in the feature</code></pre>
          </div>
          <div class="callout callout-info">
            <strong>🌳 A typical branching strategy:</strong><br>
            <code>main</code> → always deployable, production-ready<br>
            <code>develop</code> → integration branch for features<br>
            <code>feature/xyz</code> → one branch per feature/fix
          </div>
          <h3>🗑️ Cleanup</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>git branch -d feature/login  # delete branch after merging</code></pre>
          </div>
          <p>Think of branches like parallel timelines — you can jump between them freely and merge them back when ready.</p>
        `
      },
      // ── Quiz 2 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "🏆 Final Quiz — Git Basics",
        questions: [
          {
            q: "What does 'git add .' do?",
            options: [
              "Creates a new repository",
              "Stages all changed files for the next commit",
              "Commits all changes immediately",
              "Downloads files from GitHub"
            ],
            answer: 1,
            explanation: "'git add .' stages all modified and new files in the current directory. It moves changes from the Working Directory to the Staging Area."
          },
          {
            q: "You want to start a new feature without affecting the main branch. What should you do?",
            options: [
              "Edit files directly in main and be careful",
              "Create a new Git repository",
              "Create a new branch for the feature",
              "Clone the repository again"
            ],
            answer: 2,
            explanation: "Branches are designed exactly for this! Create a feature branch, do your work there, and merge it back when ready."
          },
          {
            q: "What is the correct order of the Git three-stage workflow?",
            options: [
              "Commit → Stage → Edit",
              "Edit → Commit → Stage",
              "Stage → Edit → Commit",
              "Edit → Stage → Commit"
            ],
            answer: 3,
            explanation: "You first Edit files in the working directory, then Stage the changes you want (git add), then Commit them as a snapshot (git commit)."
          },
          {
            q: "Which command downloads the latest changes from the remote repository?",
            options: [
              "git push",
              "git fetch",
              "git pull",
              "git clone"
            ],
            answer: 2,
            explanation: "'git pull' fetches the latest changes from the remote and immediately merges them into your current branch. git push does the opposite — it uploads your commits."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  TOPIC 2: JavaScript Fundamentals
  // ─────────────────────────────────────────────────────────
  {
    id: "js-fundamentals",
    title: "JavaScript Fundamentals",
    icon: "⚡",
    color: "#d97706",
    description: "Understand the building blocks of JavaScript — the language that powers the web. Start from scratch and build real understanding.",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    tags: ["Programming", "Web Dev"],
    sections: [
      // ── Lesson 1 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "What is JavaScript?",
        content: `
          <p>The web is built on three core technologies, each with a distinct job:</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Technology</th><th>Role</th><th>Analogy</th></tr></thead>
              <tbody>
                <tr><td><strong>HTML</strong></td><td>Structure & content</td><td>The skeleton 🦴</td></tr>
                <tr><td><strong>CSS</strong></td><td>Style & layout</td><td>The skin & clothes 👗</td></tr>
                <tr><td><strong>JavaScript</strong></td><td>Behaviour & logic</td><td>The muscles & brain 🧠</td></tr>
              </tbody>
            </table>
          </div>
          <p>JavaScript is what makes a page <em>interactive</em> — it responds to clicks, fetches data, validates forms, animates elements, and much more.</p>
          <h3>Where does JS run?</h3>
          <ul>
            <li><strong>Browser</strong> — every modern browser has a JS engine (Chrome uses V8, Firefox uses SpiderMonkey)</li>
            <li><strong>Server</strong> — with Node.js, JavaScript runs on the backend too</li>
            <li><strong>Mobile, Desktop, embedded</strong> — JS is everywhere today</li>
          </ul>
          <div class="callout callout-info">
            <strong>🚫 Not Java!</strong> JavaScript and Java are completely different languages. The name was a marketing decision in 1995. Don't let it confuse you.
          </div>
          <h3>Your first JavaScript</h3>
          <div class="code-block">
            <div class="code-label">JavaScript</div>
            <pre><code>console.log("Hello, World!");</code></pre>
          </div>
          <p>Open your browser's DevTools (F12 → Console tab) and type this. You'll see <code>Hello, World!</code> printed. That's JavaScript running live in your browser!</p>
        `
      },
      // ── Lesson 2 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Variables & Data Types",
        content: `
          <p>Variables are containers that store data. In modern JavaScript we use <code>let</code> and <code>const</code>:</p>
          <div class="code-block">
            <div class="code-label">JavaScript</div>
            <pre><code>let age = 25;              // can be changed later
const name = "Ravi";       // cannot be reassigned
const PI = 3.14159;

age = 26;   // ✅ allowed (let)
name = "Kumar";  // ❌ TypeError! (const)</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Rule of thumb:</strong> Always use <code>const</code> by default. Only switch to <code>let</code> if you know the value will change. Avoid <code>var</code> (the old way — has tricky scoping bugs).
          </div>
          <h3>The 7 Primitive Data Types</h3>
          <div class="code-block">
            <div class="code-label">JavaScript</div>
            <pre><code>const num = 42;              // Number (integers AND decimals)
const price = 9.99;          // Number
const greeting = "Hello";   // String
const isOnline = true;       // Boolean
const nothing = null;        // Null (intentional empty value)
let notSet;                  // Undefined (variable declared, no value yet)
const id = Symbol("uid");    // Symbol (unique identifier)</code></pre>
          </div>
          <h3>typeof — check the type</h3>
          <div class="code-block">
            <div class="code-label">JavaScript</div>
            <pre><code>typeof 42           // "number"
typeof "hello"      // "string"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof null         // "object"  ← famous JS quirk! 🐛</code></pre>
          </div>
          <p>The <code>typeof null === "object"</code> result is a well-known historical bug in JavaScript that was never fixed to preserve backward compatibility.</p>
        `
      },
      // ── Quiz 1 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "⚡ Quick Check #1",
        questions: [
          {
            q: "What is the role of JavaScript in a web page?",
            options: [
              "Defines the page structure",
              "Styles elements with colours and layout",
              "Adds interactivity and behaviour",
              "Stores data in a database"
            ],
            answer: 2,
            explanation: "HTML = structure, CSS = style, JavaScript = behaviour. JS makes pages interactive — responding to clicks, fetching data, animating elements, etc."
          },
          {
            q: "Which of these correctly declares a constant in modern JavaScript?",
            options: [
              "var name = 'Ravi'",
              "let name = 'Ravi'",
              "const name = 'Ravi'",
              "constant name = 'Ravi'"
            ],
            answer: 2,
            explanation: "'const' declares a constant — a variable that cannot be reassigned after declaration. It's the preferred way to declare variables that won't change."
          },
          {
            q: "What does typeof null return in JavaScript?",
            options: [
              "\"null\"",
              "\"undefined\"",
              "\"object\"",
              "\"boolean\""
            ],
            answer: 2,
            explanation: "typeof null === 'object' is a famous historical bug in JavaScript. null is not actually an object — this was a mistake in the original implementation that was kept for backward compatibility."
          }
        ]
      },
      // ── Lesson 3 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Functions",
        content: `
          <p>Functions are reusable blocks of code that perform a specific task. Instead of writing the same logic 10 times, you write it once and call it whenever you need it.</p>
          <h3>3 Ways to Write Functions</h3>
          <div class="code-block">
            <div class="code-label">JavaScript — Function Declaration</div>
            <pre><code>function greet(name) {
  return "Hello, " + name + "!";
}
greet("Ravi");  // "Hello, Ravi!"</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">JavaScript — Function Expression</div>
            <pre><code>const greet = function(name) {
  return "Hello, " + name + "!";
};</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">JavaScript — Arrow Function (modern, preferred)</div>
            <pre><code>const greet = (name) => "Hello, " + name + "!";

// Multi-line arrow function
const add = (a, b) => {
  const result = a + b;
  return result;
};</code></pre>
          </div>
          <h3>Parameters vs Arguments</h3>
          <p><strong>Parameters</strong> are the names in the function definition (<code>name</code>). <strong>Arguments</strong> are the actual values passed when calling it (<code>"Ravi"</code>).</p>
          <h3>Default Parameters</h3>
          <div class="code-block">
            <div class="code-label">JavaScript</div>
            <pre><code>const greet = (name = "stranger") => "Hello, " + name + "!";

greet("Ravi");   // "Hello, Ravi!"
greet();         // "Hello, stranger!"</code></pre>
          </div>
          <div class="callout callout-info">
            <strong>🔑 Key point:</strong> Functions that don't have a <code>return</code> statement automatically return <code>undefined</code>.
          </div>
        `
      },
      // ── Lesson 4 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Control Flow — if/else & Loops",
        content: `
          <p>Control flow lets your code make decisions and repeat actions.</p>
          <h3>🔀 Conditionals</h3>
          <div class="code-block">
            <div class="code-label">JavaScript</div>
            <pre><code>const score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");   // ← this runs
} else if (score >= 70) {
  console.log("Grade: C");
} else {
  console.log("Grade: D or below");
}</code></pre>
          </div>
          <h3>🔁 Loops</h3>
          <div class="code-block">
            <div class="code-label">JavaScript — for loop</div>
            <pre><code>for (let i = 0; i < 5; i++) {
  console.log("Count:", i);   // 0, 1, 2, 3, 4
}</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">JavaScript — forEach (array) — preferred modern style</div>
            <pre><code>const fruits = ["apple", "banana", "cherry"];

fruits.forEach((fruit) => {
  console.log(fruit);
});</code></pre>
          </div>
          <h3>⚠️ == vs ===</h3>
          <p>This trips up most beginners — always use <strong>strict equality</strong> <code>===</code>:</p>
          <div class="code-block">
            <div class="code-label">JavaScript</div>
            <pre><code>5 == "5"    // true  (loose — converts types first 😱)
5 === "5"   // false (strict — checks type AND value ✅)

null == undefined   // true  (loose)
null === undefined  // false (strict)</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Golden rule:</strong> Always use <code>===</code> (triple equals) for comparisons. Avoid <code>==</code> entirely to prevent subtle bugs.
          </div>
        `
      },
      // ── Quiz 2 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "🏆 Final Quiz — JS Fundamentals",
        questions: [
          {
            q: "What will this code print?\n\nconst add = (a, b) => a + b;\nconsole.log(add(3, 4));",
            options: [
              "undefined",
              "34",
              "7",
              "Error"
            ],
            answer: 2,
            explanation: "This is an arrow function that returns 'a + b'. Since a=3 and b=4, it returns 7. Arrow functions with a single expression implicitly return that value."
          },
          {
            q: "What is the difference between == and === in JavaScript?",
            options: [
              "They are identical — both check type and value",
              "== is strict (checks type+value), === is loose (converts types)",
              "=== is strict (checks type+value), == is loose (converts types)",
              "=== only works for numbers"
            ],
            answer: 2,
            explanation: "=== (strict equality) checks both type and value. == (loose equality) converts types before comparing, which can cause unexpected results. Always prefer ===."
          },
          {
            q: "What does the following print?\n\nconst greet = (name = 'World') => 'Hello, ' + name;\nconsole.log(greet());",
            options: [
              "Hello, undefined",
              "Hello, World",
              "Hello, name",
              "Error: name is not defined"
            ],
            answer: 1,
            explanation: "When no argument is passed, the default parameter 'World' is used. So greet() returns 'Hello, World'."
          },
          {
            q: "Which loop style is preferred in modern JavaScript for iterating over arrays?",
            options: [
              "while loop",
              "do...while loop",
              "classic for loop with index",
              "forEach with an arrow function"
            ],
            answer: 3,
            explanation: "forEach with an arrow function is the modern, readable preference for iterating array items. It's declarative — you describe 'what to do with each item', not 'how to iterate'."
          }
        ]
      }
    ]
  }

  // ─────────────────────────────────────────────────────────
  //  ADD YOUR NEXT TOPIC HERE
  //  Just copy the structure above and fill in your content!
  // ─────────────────────────────────────────────────────────
];
