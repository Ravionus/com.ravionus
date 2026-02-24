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
  },

  // ─────────────────────────────────────────────────────────
  //  TOPIC 3: Python Fundamentals
  // ─────────────────────────────────────────────────────────
  {
    id: "python-fundamentals",
    title: "Python Fundamentals",
    icon: "🐍",
    color: "#16a34a",
    description: "Discover Python — the world's most beginner-friendly programming language. From variables to functions, build a solid foundation for data science, automation, and beyond.",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    tags: ["Programming", "Python"],
    sections: [
      // ── Lesson 1 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "What is Python?",
        content: `
          <p>Python is one of the most popular programming languages in the world — and for good reason. It reads almost like plain English, making it perfect for beginners while remaining powerful enough for experts.</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Use Case</th><th>Examples</th></tr></thead>
              <tbody>
                <tr><td>🌐 Web Development</td><td>Django, Flask, FastAPI</td></tr>
                <tr><td>📊 Data Science & AI</td><td>NumPy, Pandas, TensorFlow</td></tr>
                <tr><td>🤖 Automation & Scripting</td><td>File handling, web scraping</td></tr>
                <tr><td>🎮 Game Development</td><td>Pygame</td></tr>
                <tr><td>🔬 Scientific Computing</td><td>SciPy, Matplotlib</td></tr>
              </tbody>
            </table>
          </div>
          <h3>Why Python?</h3>
          <ul>
            <li>✅ <strong>Readable syntax</strong> — less boilerplate, more clarity</li>
            <li>✅ <strong>Huge ecosystem</strong> — hundreds of thousands of libraries</li>
            <li>✅ <strong>Cross-platform</strong> — runs on Windows, Mac, Linux</li>
            <li>✅ <strong>Interpreted</strong> — run code line by line without compiling</li>
          </ul>
          <h3>Your first Python program</h3>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>print("Hello, World!")</code></pre>
          </div>
          <p>That's it — just one line! No semicolons. No curly braces. No boilerplate. Python uses <strong>indentation</strong> (spaces) instead of braces to define code blocks.</p>
          <div class="callout callout-info">
            <strong>🐍 Fun fact:</strong> Python is named after the British comedy group <em>Monty Python</em>, not the snake — though the snake logo became iconic anyway!
          </div>
        `
      },
      // ── Lesson 2 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Variables & Data Types",
        content: `
          <p>In Python, you don't need to declare the type of a variable — Python figures it out automatically. This is called <strong>dynamic typing</strong>.</p>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>name = "Ravi"          # str  (text)
age = 28               # int  (whole number)
height = 5.11          # float (decimal)
is_active = True       # bool (True or False)
scores = [95, 87, 92]  # list (ordered collection)
person = {"city": "Bengaluru", "lang": "Python"}  # dict</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Note:</strong> Python is <em>case-sensitive</em>. <code>True</code> and <code>False</code> must be capitalised — <code>true</code> will cause an error!
          </div>
          <h3>Checking Types</h3>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>print(type("hello"))    # &lt;class 'str'&gt;
print(type(42))         # &lt;class 'int'&gt;
print(type(3.14))       # &lt;class 'float'&gt;
print(type(True))       # &lt;class 'bool'&gt;</code></pre>
          </div>
          <h3>String Operations</h3>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>first = "Hello"
second = "World"
combined = first + " " + second   # "Hello World"

# f-strings (modern, preferred)
name = "Ravi"
greeting = f"Hello, {name}! You are {age} years old."
print(greeting)  # Hello, Ravi! You are 28 years old.</code></pre>
          </div>
          <div class="callout callout-info">
            <strong>💡 f-strings</strong> (formatted strings) are the modern way to embed variables inside text in Python. Prefix the string with <code>f</code> and use <code>{variable}</code> inside.
          </div>
        `
      },
      // ── Quiz 1 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "⚡ Quick Check #1",
        questions: [
          {
            q: "What will print(type(3.14)) output in Python?",
            options: [
              "<class 'int'>",
              "<class 'number'>",
              "<class 'float'>",
              "<class 'decimal'>"
            ],
            answer: 2,
            explanation: "3.14 is a floating-point number in Python, so type() returns <class 'float'>. Python distinguishes between int (whole numbers) and float (decimals)."
          },
          {
            q: "Which of these correctly creates an f-string in Python?",
            options: [
              "\"Hello, ${name}\"",
              "f\"Hello, {name}\"",
              "\"Hello, \" + {name}",
              "format(\"Hello, name\")"
            ],
            answer: 1,
            explanation: "f-strings are created by prefixing a string with 'f' and placing variable names inside curly braces {}. They are the modern, preferred way to format strings in Python 3.6+."
          },
          {
            q: "What is 'dynamic typing' in Python?",
            options: [
              "Variables can change their value frequently",
              "Python automatically determines a variable's type based on its value",
              "You must declare the type before using a variable",
              "Types are checked at compile time"
            ],
            answer: 1,
            explanation: "Dynamic typing means Python infers the type of a variable from the value assigned to it. You don't write 'int age = 28' — just 'age = 28' and Python knows it's an int."
          }
        ]
      },
      // ── Lesson 3 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Functions",
        content: `
          <p>Functions let you write a block of code once and reuse it many times. Python functions are defined with the <code>def</code> keyword.</p>
          <div class="code-block">
            <div class="code-label">Python — Basic Function</div>
            <pre><code>def greet(name):
    return f"Hello, {name}!"

print(greet("Ravi"))    # Hello, Ravi!
print(greet("World"))   # Hello, World!</code></pre>
          </div>
          <div class="callout callout-info">
            <strong>⚠️ Indentation matters!</strong> Python uses 4 spaces of indentation to define code blocks. Unlike JavaScript (which uses <code>{}</code>), getting the indentation wrong causes a <code>IndentationError</code>.
          </div>
          <h3>Default Parameters</h3>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>def greet(name="stranger"):
    return f"Hello, {name}!"

print(greet("Ravi"))  # Hello, Ravi!
print(greet())        # Hello, stranger!</code></pre>
          </div>
          <h3>Multiple Return Values</h3>
          <p>Python functions can return multiple values at once — a feature not available in most other languages:</p>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>def min_max(numbers):
    return min(numbers), max(numbers)

lowest, highest = min_max([3, 1, 7, 2, 9])
print(lowest)   # 1
print(highest)  # 9</code></pre>
          </div>
          <h3>Lambda Functions</h3>
          <p>For short, one-liner functions, Python has <strong>lambda</strong> expressions:</p>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>square = lambda x: x ** 2
print(square(5))   # 25

double = lambda x: x * 2
print(double(7))   # 14</code></pre>
          </div>
        `
      },
      // ── Lesson 4 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Control Flow — if/else & Loops",
        content: `
          <p>Control flow in Python is clean and readable — no parentheses required around conditions, and no curly braces.</p>
          <h3>🔀 Conditionals</h3>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code>score = 85

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")   # ← this runs
elif score >= 70:
    print("Grade: C")
else:
    print("Grade: D or below")</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Note:</strong> Python uses <code>elif</code> (not <code>else if</code>) for chained conditions. Don't forget the <strong>colons</strong> — they end every condition/loop header.
          </div>
          <h3>🔁 Loops</h3>
          <div class="code-block">
            <div class="code-label">Python — for loop</div>
            <pre><code>fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)   # apple, banana, cherry</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Python — range loop</div>
            <pre><code>for i in range(5):
    print(i)   # 0, 1, 2, 3, 4

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)   # 0, 2, 4, 6, 8</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Python — while loop</div>
            <pre><code>count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1   # 0, 1, 2</code></pre>
          </div>
          <h3>List Comprehensions — Python's Secret Weapon 🚀</h3>
          <p>Python has a powerful one-liner syntax for creating lists:</p>
          <div class="code-block">
            <div class="code-label">Python</div>
            <pre><code># Traditional way
squares = []
for x in range(5):
    squares.append(x ** 2)

# List comprehension — same result, one line!
squares = [x ** 2 for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]

# With condition
evens = [x for x in range(10) if x % 2 == 0]
print(evens)    # [0, 2, 4, 6, 8]</code></pre>
          </div>
        `
      },
      // ── Quiz 2 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "🏆 Final Quiz — Python Fundamentals",
        questions: [
          {
            q: "What keyword does Python use to define a function?",
            options: [
              "function",
              "func",
              "def",
              "fn"
            ],
            answer: 2,
            explanation: "Python uses the 'def' keyword to define functions, followed by the function name, parameters in parentheses, and a colon. The function body is indented."
          },
          {
            q: "What will this code print?\n\nfor i in range(2, 8, 2):\n    print(i)",
            options: [
              "2 4 6 8",
              "2 4 6",
              "0 2 4 6",
              "2 3 4 5 6 7"
            ],
            answer: 1,
            explanation: "range(2, 8, 2) starts at 2, stops before 8, stepping by 2. So it produces: 2, 4, 6. The stop value (8) is excluded."
          },
          {
            q: "Which of these is a valid Python list comprehension?",
            options: [
              "[x * 2 from x in range(5)]",
              "{x * 2 for x in range(5)}",
              "[x * 2 for x in range(5)]",
              "(x * 2 for x in range(5)).toList()"
            ],
            answer: 2,
            explanation: "A list comprehension uses square brackets [] with the expression first, then 'for item in iterable'. Option B creates a set, not a list. The syntax is: [expression for item in iterable]."
          },
          {
            q: "What is the output of this code?\n\ndef add(a, b=10):\n    return a + b\n\nprint(add(5))",
            options: [
              "Error: missing argument",
              "5",
              "10",
              "15"
            ],
            answer: 3,
            explanation: "b has a default value of 10. When add(5) is called, a=5 and b=10 (the default). So a + b = 5 + 10 = 15."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  TOPIC 4: DevOps Fundamentals
  // ─────────────────────────────────────────────────────────
  {
    id: "devops-fundamentals",
    title: "DevOps Fundamentals",
    icon: "⚙️",
    color: "#0891b2",
    description: "Bridge the gap between development and operations. Learn CI/CD pipelines, containers, infrastructure as code, and the culture that makes modern software delivery fast and reliable.",
    difficulty: "Intermediate",
    estimatedTime: "35 min",
    tags: ["DevOps", "Cloud", "Tools"],
    sections: [
      // ── Lesson 1 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "What is DevOps?",
        content: `
          <p>DevOps is a <strong>culture and set of practices</strong> that brings development (Dev) and operations (Ops) teams together to deliver software faster, more reliably, and more securely.</p>
          <div class="callout callout-info">
            <strong>🧠 Core idea:</strong> Instead of developers throwing code "over the wall" to ops teams, everyone owns the full lifecycle — from writing code to running it in production.
          </div>
          <h3>The Old Way vs the DevOps Way</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Traditional</th><th>DevOps</th></tr></thead>
              <tbody>
                <tr><td>Dev and Ops in silos</td><td>Shared ownership of delivery</td></tr>
                <tr><td>Long release cycles (months)</td><td>Continuous delivery (daily/hourly)</td></tr>
                <tr><td>Manual testing & deployment</td><td>Automated pipelines</td></tr>
                <tr><td>Ops manages servers manually</td><td>Infrastructure as Code</td></tr>
                <tr><td>Blame culture</td><td>Blameless post-mortems</td></tr>
              </tbody>
            </table>
          </div>
          <h3>The DevOps Infinity Loop</h3>
          <p>DevOps is often visualised as an infinite loop covering 8 phases:</p>
          <div class="stages">
            <div class="stage"><span class="stage-num">1</span><strong>Plan</strong><br>Roadmap & backlog</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">2</span><strong>Code</strong><br>Write & review</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">3</span><strong>Build</strong><br>Compile & package</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">4</span><strong>Test</strong><br>Automated checks</div>
          </div>
          <div class="stages" style="margin-top:8px">
            <div class="stage"><span class="stage-num">5</span><strong>Release</strong><br>Approve & tag</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">6</span><strong>Deploy</strong><br>Push to production</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">7</span><strong>Operate</strong><br>Run & scale</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">8</span><strong>Monitor</strong><br>Observe & alert</div>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Key metric:</strong> <strong>DORA metrics</strong> (Deployment Frequency, Lead Time, Change Failure Rate, MTTR) are the industry-standard way to measure DevOps performance.
          </div>
        `
      },
      // ── Lesson 2 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "CI/CD Pipelines",
        content: `
          <p><strong>CI/CD</strong> (Continuous Integration / Continuous Delivery) is the backbone of modern software delivery. It replaces slow, error-prone manual processes with automated pipelines.</p>
          <h3>🔄 Continuous Integration (CI)</h3>
          <p>Every time a developer pushes code, CI automatically:</p>
          <ul>
            <li>🏗️ <strong>Builds</strong> the application</li>
            <li>🧪 <strong>Runs tests</strong> (unit, integration, lint)</li>
            <li>📊 <strong>Reports results</strong> back to the developer immediately</li>
          </ul>
          <div class="callout callout-info">
            <strong>💡 Why CI matters:</strong> Catching bugs the moment they're introduced is 10× cheaper than finding them weeks later in production. CI creates a tight feedback loop.
          </div>
          <h3>🚀 Continuous Delivery (CD)</h3>
          <p>CD extends CI — after tests pass, the pipeline automatically <strong>deploys</strong> the code to staging (and optionally, production).</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Term</th><th>Meaning</th></tr></thead>
              <tbody>
                <tr><td><strong>CI</strong></td><td>Auto-build + auto-test on every push</td></tr>
                <tr><td><strong>Continuous Delivery</strong></td><td>Auto-deploy to staging; manual approval for production</td></tr>
                <tr><td><strong>Continuous Deployment</strong></td><td>Fully automated — code goes to production without human approval</td></tr>
              </tbody>
            </table>
          </div>
          <h3>📋 A Typical CI/CD Pipeline</h3>
          <div class="code-block">
            <div class="code-label">GitHub Actions — .github/workflows/deploy.yml</div>
            <pre><code>name: CI/CD Pipeline

on: [push]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy to production
        run: ./deploy.sh</code></pre>
          </div>
          <p>Popular CI/CD tools: <strong>GitHub Actions</strong>, <strong>GitLab CI</strong>, <strong>Jenkins</strong>, <strong>CircleCI</strong>, <strong>ArgoCD</strong>.</p>
        `
      },
      // ── Quiz 1 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "⚡ Quick Check #1",
        questions: [
          {
            q: "What does 'CI' stand for and what does it primarily automate?",
            options: [
              "Code Integration — merging branches manually",
              "Continuous Integration — automatically building and testing code on every push",
              "Cloud Infrastructure — provisioning servers automatically",
              "Container Images — building Docker images"
            ],
            answer: 1,
            explanation: "CI stands for Continuous Integration. It automatically builds and tests code every time a developer pushes a change, catching bugs early in the development cycle."
          },
          {
            q: "What is the key difference between Continuous Delivery and Continuous Deployment?",
            options: [
              "They are the same thing",
              "Continuous Delivery requires manual approval before production; Continuous Deployment is fully automated",
              "Continuous Deployment requires manual approval; Continuous Delivery is fully automated",
              "Continuous Delivery only runs tests, not deployments"
            ],
            answer: 1,
            explanation: "Continuous Delivery deploys automatically to staging but requires a human to approve the final push to production. Continuous Deployment skips that human gate — every passing build goes straight to production."
          },
          {
            q: "Which of these is NOT one of the DORA metrics for measuring DevOps performance?",
            options: [
              "Deployment Frequency",
              "Mean Time to Recovery (MTTR)",
              "Number of Developers",
              "Change Failure Rate"
            ],
            answer: 2,
            explanation: "The four DORA metrics are: Deployment Frequency, Lead Time for Changes, Change Failure Rate, and Mean Time to Recovery (MTTR). Team size is not a DORA metric."
          }
        ]
      },
      // ── Lesson 3 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Containers & Docker",
        content: `
          <p>Containers solve the classic <em>"it works on my machine!"</em> problem by packaging an application <strong>together with everything it needs to run</strong> — code, runtime, libraries, and config — into a single portable unit.</p>
          <h3>🐳 What is Docker?</h3>
          <p>Docker is the most popular platform for building and running containers. A <strong>Docker image</strong> is the blueprint; a <strong>container</strong> is a running instance of that image.</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Concept</th><th>Analogy</th></tr></thead>
              <tbody>
                <tr><td><strong>Docker Image</strong></td><td>A recipe / blueprint</td></tr>
                <tr><td><strong>Docker Container</strong></td><td>A meal cooked from that recipe</td></tr>
                <tr><td><strong>Dockerfile</strong></td><td>Instructions for creating the recipe</td></tr>
                <tr><td><strong>Docker Hub</strong></td><td>A recipe book (image registry)</td></tr>
              </tbody>
            </table>
          </div>
          <h3>📄 A Simple Dockerfile</h3>
          <div class="code-block">
            <div class="code-label">Dockerfile</div>
            <pre><code># Start from an official Node.js base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port and start the app
EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
          </div>
          <h3>🛠️ Essential Docker Commands</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>docker build -t my-app .        # Build an image from a Dockerfile
docker run -p 3000:3000 my-app  # Run a container (map port 3000)
docker ps                       # List running containers
docker stop <container-id>      # Stop a container
docker pull nginx               # Download an image from Docker Hub</code></pre>
          </div>
          <h3>🆚 Containers vs Virtual Machines</h3>
          <p>Containers share the host OS kernel and are <strong>lightweight</strong> (MBs, start in seconds). VMs include a full OS (GBs, take minutes to boot). For most microservices, containers are the preferred choice.</p>
          <div class="callout callout-tip">
            <strong>🚀 Next level:</strong> <strong>Kubernetes (K8s)</strong> is the industry-standard tool for <em>orchestrating</em> many containers — automatically scheduling, scaling, and healing them across a cluster of machines.
          </div>
        `
      },
      // ── Lesson 4 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Infrastructure as Code (IaC)",
        content: `
          <p><strong>Infrastructure as Code (IaC)</strong> means managing and provisioning servers, networks, and cloud resources using <em>code and configuration files</em> — instead of clicking through a web console or running manual commands.</p>
          <div class="callout callout-info">
            <strong>💡 Why IaC?</strong> Infrastructure defined in code can be version-controlled (in Git), reviewed, tested, and reproduced identically across environments — eliminating the "snowflake server" problem.
          </div>
          <h3>Key IaC Tools</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Tool</th><th>What it does</th><th>By</th></tr></thead>
              <tbody>
                <tr><td><strong>Terraform</strong></td><td>Provisions cloud resources (VMs, DBs, networks)</td><td>HashiCorp</td></tr>
                <tr><td><strong>Ansible</strong></td><td>Configures & deploys software on existing servers</td><td>Red Hat</td></tr>
                <tr><td><strong>AWS CloudFormation</strong></td><td>AWS-native IaC with JSON/YAML templates</td><td>Amazon</td></tr>
                <tr><td><strong>Pulumi</strong></td><td>IaC using real programming languages (Python, JS)</td><td>Pulumi Corp</td></tr>
              </tbody>
            </table>
          </div>
          <h3>🔧 A Terraform Example</h3>
          <div class="code-block">
            <div class="code-label">Terraform — main.tf</div>
            <pre><code># Provision an EC2 instance on AWS
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "MyWebServer"
    Env  = "production"
  }
}</code></pre>
          </div>
          <div class="code-block">
            <div class="code-label">Terminal — Terraform workflow</div>
            <pre><code>terraform init    # Download providers & set up state
terraform plan    # Preview what will be created/changed
terraform apply   # Actually create/update the infrastructure
terraform destroy # Tear everything down</code></pre>
          </div>
          <h3>🔑 IaC Best Practices</h3>
          <ul>
            <li>📁 Store all IaC code in <strong>Git</strong> — infrastructure changes should go through pull requests</li>
            <li>🌍 Use <strong>separate state files</strong> per environment (dev, staging, production)</li>
            <li>🔒 Never hardcode secrets — use environment variables or secret managers (AWS Secrets Manager, HashiCorp Vault)</li>
            <li>♻️ Write <strong>reusable modules</strong> to avoid repeating yourself</li>
          </ul>
          <div class="callout callout-tip">
            <strong>🎯 Golden rule:</strong> If you clicked a button to create a resource, it's not IaC. Everything should be code — reproducible, reviewable, and version-controlled.
          </div>
        `
      },
      // ── Quiz 2 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "🏆 Final Quiz — DevOps Fundamentals",
        questions: [
          {
            q: "What problem do containers primarily solve?",
            options: [
              "Making code run faster on all machines",
              "Replacing version control systems like Git",
              "Ensuring the app runs consistently regardless of environment ('works on my machine')",
              "Providing unlimited cloud storage"
            ],
            answer: 2,
            explanation: "Containers bundle the app with all its dependencies, ensuring it runs identically on a developer's laptop, a CI server, or in production. This eliminates environment-specific bugs."
          },
          {
            q: "In Docker terminology, what is the relationship between an image and a container?",
            options: [
              "They are the same thing",
              "An image is a running instance; a container is the blueprint",
              "A container is a running instance of an image",
              "An image is created from a running container"
            ],
            answer: 2,
            explanation: "A Docker image is the blueprint (built from a Dockerfile). A container is a live, running instance of that image. You can run many containers from the same image."
          },
          {
            q: "What is the correct order of the standard Terraform workflow?",
            options: [
              "apply → plan → init",
              "init → apply → plan",
              "plan → init → apply",
              "init → plan → apply"
            ],
            answer: 3,
            explanation: "'terraform init' downloads providers and sets up state. 'terraform plan' previews changes. 'terraform apply' actually creates/modifies infrastructure. Always init first, plan second, apply third."
          },
          {
            q: "Which of these best describes Infrastructure as Code (IaC)?",
            options: [
              "Writing scripts to test your application code",
              "Managing servers and cloud resources through version-controlled configuration files",
              "Using a GUI dashboard to provision cloud resources",
              "Documenting your infrastructure in a wiki"
            ],
            answer: 1,
            explanation: "IaC means defining your infrastructure (servers, networks, databases) in code files that can be version-controlled, reviewed, and automatically applied — making infrastructure as repeatable and auditable as application code."
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
