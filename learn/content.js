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
  },

  // ─────────────────────────────────────────────────────────
  //  TOPIC 5: GenAI Fundamentals
  // ─────────────────────────────────────────────────────────
  {
    id: "genai-fundamentals",
    title: "GenAI Fundamentals",
    icon: "🤖",
    color: "#9333ea",
    description: "Understand the technology reshaping the world. Learn how Large Language Models work, how to write effective prompts, and how to use AI tools responsibly and productively.",
    difficulty: "Beginner",
    estimatedTime: "30 min",
    tags: ["AI", "Machine Learning", "Tools"],
    sections: [
      // ── Lesson 1 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "What is Generative AI?",
        content: `
          <p><strong>Generative AI</strong> refers to AI systems that can <em>create</em> new content — text, images, code, audio, and video — rather than just classifying or analysing existing data.</p>
          <div class="callout callout-info">
            <strong>🧠 Key distinction:</strong> Traditional AI <em>recognises</em> patterns (e.g. "Is this email spam?"). Generative AI <em>produces</em> new content (e.g. "Write me a professional email about X").
          </div>
          <h3>A Brief Timeline</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Year</th><th>Milestone</th></tr></thead>
              <tbody>
                <tr><td>2017</td><td>Google publishes the <strong>Transformer</strong> architecture ("Attention is All You Need")</td></tr>
                <tr><td>2018</td><td>OpenAI releases <strong>GPT-1</strong>; Google releases <strong>BERT</strong></td></tr>
                <tr><td>2020</td><td><strong>GPT-3</strong> stuns the world with human-like text generation</td></tr>
                <tr><td>2022</td><td><strong>ChatGPT</strong> launches — 1 million users in 5 days</td></tr>
                <tr><td>2023–24</td><td>GPT-4, Gemini, Claude, Llama — the era of multimodal AI</td></tr>
              </tbody>
            </table>
          </div>
          <h3>What Can GenAI Create?</h3>
          <ul>
            <li>📝 <strong>Text</strong> — articles, emails, code, summaries, translations</li>
            <li>🖼️ <strong>Images</strong> — artwork, photos, logos (DALL·E, Midjourney, Stable Diffusion)</li>
            <li>🎵 <strong>Audio</strong> — music, voice cloning, sound effects</li>
            <li>🎬 <strong>Video</strong> — synthetic video clips (Sora, Runway, Pika)</li>
            <li>💻 <strong>Code</strong> — full functions, tests, refactoring (GitHub Copilot, Cursor)</li>
          </ul>
          <div class="callout callout-tip">
            <strong>🎯 Not magic:</strong> GenAI models are sophisticated <em>pattern-completion engines</em> trained on vast datasets. They predict the most probable next token — they don't "think" or "understand" in the human sense.
          </div>
        `
      },
      // ── Lesson 2 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "LLMs — How They Work",
        content: `
          <p><strong>Large Language Models (LLMs)</strong> are the engine behind tools like ChatGPT, Gemini, and Claude. Understanding how they work helps you use them more effectively.</p>
          <h3>🔤 Tokens — the Atomic Unit</h3>
          <p>LLMs don't process words — they process <strong>tokens</strong>. A token is roughly 3–4 characters or ¾ of a word. "Hello world" is 2 tokens; a 1000-word essay is ~750 tokens.</p>
          <div class="callout callout-info">
            <strong>Why tokens matter:</strong> Every LLM has a <strong>context window</strong> — a maximum number of tokens it can process at once. GPT-4 handles ~128 000 tokens; Gemini 1.5 Pro handles up to 1 million.
          </div>
          <h3>🏋️ Training in Three Stages</h3>
          <div class="stages">
            <div class="stage"><span class="stage-num">1</span><strong>Pre-training</strong><br>Predict next token on trillions of words from the internet</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">2</span><strong>Fine-tuning</strong><br>Train on curated high-quality instruction-response pairs</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">3</span><strong>RLHF</strong><br>Humans rank outputs; model learns from feedback</div>
          </div>
          <p style="margin-top:8px"><strong>RLHF</strong> = Reinforcement Learning from Human Feedback — the key step that transforms a next-token predictor into a helpful assistant.</p>
          <h3>🌡️ Temperature & Randomness</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Temperature</th><th>Behaviour</th><th>Best For</th></tr></thead>
              <tbody>
                <tr><td><strong>0.0</strong></td><td>Deterministic — always the most likely token</td><td>Factual Q&A, code generation</td></tr>
                <tr><td><strong>0.7</strong></td><td>Balanced creativity and coherence</td><td>General chat, summaries</td></tr>
                <tr><td><strong>1.0+</strong></td><td>High randomness — diverse, surprising outputs</td><td>Brainstorming, creative writing</td></tr>
              </tbody>
            </table>
          </div>
          <h3>⚠️ Key Limitations</h3>
          <ul>
            <li>🔻 <strong>Hallucinations</strong> — LLMs confidently make up false facts</li>
            <li>📅 <strong>Knowledge cutoff</strong> — training data has a cut-off date; models don't know recent events</li>
            <li>📐 <strong>No true reasoning</strong> — they mimic reasoning via pattern matching, not logical deduction</li>
            <li>🔁 <strong>Context window limits</strong> — very long documents may be truncated</li>
          </ul>
        `
      },
      // ── Quiz 1 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "⚡ Quick Check #1",
        questions: [
          {
            q: "What is a 'token' in the context of Large Language Models?",
            options: [
              "A security credential used to authenticate API requests",
              "A full word processed by the model",
              "The smallest unit of text (roughly 3-4 characters) that an LLM processes",
              "A type of neural network layer"
            ],
            answer: 2,
            explanation: "Tokens are the atomic units LLMs work with — roughly 3-4 characters or ¾ of an average word. Understanding tokens helps you reason about context window limits and API costs (which are priced per token)."
          },
          {
            q: "What does a higher 'temperature' setting do to an LLM's output?",
            options: [
              "Makes the model run faster",
              "Increases randomness and creativity in the output",
              "Makes the output more factual and deterministic",
              "Increases the context window size"
            ],
            answer: 1,
            explanation: "Temperature controls randomness. A temperature of 0 makes the model pick the most probable token every time (deterministic). Higher temperatures make the model sample more randomly, producing more creative but less predictable outputs."
          },
          {
            q: "What is an LLM 'hallucination'?",
            options: [
              "When the model crashes due to a complex query",
              "When the model generates images instead of text",
              "When the model confidently produces false or made-up information",
              "When the model refuses to answer a question"
            ],
            answer: 2,
            explanation: "Hallucinations are when an LLM generates plausible-sounding but factually incorrect information — and presents it confidently. This is a key limitation to watch for, especially with facts, citations, and specific data."
          }
        ]
      },
      // ── Lesson 3 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Prompt Engineering",
        content: `
          <p><strong>Prompt engineering</strong> is the skill of crafting inputs to AI models that reliably produce useful, accurate, and well-formatted outputs. A better prompt = dramatically better results.</p>
          <div class="callout callout-info">
            <strong>💡 Key insight:</strong> LLMs are powerful but literal. They do exactly what you ask — so asking precisely and completely is everything.
          </div>
          <h3>🏗️ The Anatomy of a Great Prompt</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Component</th><th>Purpose</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><strong>Role</strong></td><td>Sets the persona</td><td>"You are a senior software engineer..."</td></tr>
                <tr><td><strong>Context</strong></td><td>Provides background</td><td>"I'm building a React e-commerce app..."</td></tr>
                <tr><td><strong>Task</strong></td><td>What to do</td><td>"Review this function and suggest improvements"</td></tr>
                <tr><td><strong>Format</strong></td><td>How to respond</td><td>"Return as bullet points, max 5 items"</td></tr>
                <tr><td><strong>Constraints</strong></td><td>Limits & rules</td><td>"Avoid using external libraries"</td></tr>
              </tbody>
            </table>
          </div>
          <h3>🔑 Core Techniques</h3>
          <p><strong>1. Zero-shot prompting</strong> — Ask directly without examples:</p>
          <div class="code-block">
            <div class="code-label">Prompt</div>
            <pre><code>Translate this sentence to French: "The meeting starts at 9am."</code></pre>
          </div>
          <p><strong>2. Few-shot prompting</strong> — Provide examples to guide the format:</p>
          <div class="code-block">
            <div class="code-label">Prompt</div>
            <pre><code>Classify the sentiment. Examples:
"I love this product!" → Positive
"Terrible experience." → Negative
"It was okay." → Neutral

Now classify: "The delivery was late but the item is great."</code></pre>
          </div>
          <p><strong>3. Chain-of-thought</strong> — Tell the model to reason step by step:</p>
          <div class="code-block">
            <div class="code-label">Prompt</div>
            <pre><code>A train travels 120 km in 1.5 hours. What is its speed in km/h?
Think step by step.</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Golden rules:</strong> Be specific over vague. Give examples when you want a specific format. Say what you <em>do</em> want, not just what you don't. And always iterate — prompting is an experiment.
          </div>
        `
      },
      // ── Lesson 4 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "AI Tools & Responsible Use",
        content: `
          <p>The GenAI landscape is moving fast. Here's a map of the key tools and the critical principles for using them responsibly.</p>
          <h3>🗺️ Key AI Tools by Category</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Category</th><th>Top Tools</th></tr></thead>
              <tbody>
                <tr><td><strong>Chat / General</strong></td><td>ChatGPT (OpenAI), Gemini (Google), Claude (Anthropic)</td></tr>
                <tr><td><strong>Coding</strong></td><td>GitHub Copilot, Cursor, Codeium, Amazon Q Developer</td></tr>
                <tr><td><strong>Image Generation</strong></td><td>DALL·E 3, Midjourney, Stable Diffusion, Adobe Firefly</td></tr>
                <tr><td><strong>Search + AI</strong></td><td>Perplexity, Google AI Overviews, Bing Copilot</td></tr>
                <tr><td><strong>Open-source LLMs</strong></td><td>Meta Llama, Mistral, Falcon — run locally or self-hosted</td></tr>
              </tbody>
            </table>
          </div>
          <h3>🔗 RAG — Grounding AI in Your Data</h3>
          <p><strong>Retrieval-Augmented Generation (RAG)</strong> is the most popular technique for giving LLMs access to up-to-date or private information:</p>
          <div class="stages">
            <div class="stage"><span class="stage-num">1</span><strong>Retrieve</strong><br>Search your docs for relevant chunks</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">2</span><strong>Augment</strong><br>Inject chunks into the prompt as context</div>
            <div class="stage-arrow">→</div>
            <div class="stage"><span class="stage-num">3</span><strong>Generate</strong><br>LLM answers using that grounded context</div>
          </div>
          <h3>⚖️ Responsible AI Use</h3>
          <ul>
            <li>✅ <strong>Verify outputs</strong> — never publish AI-generated facts without checking. Hallucinations are real.</li>
            <li>🔒 <strong>Protect privacy</strong> — don't paste personal data, passwords, or confidential business info into public AI tools</li>
            <li>🪞 <strong>Watch for bias</strong> — LLMs can reflect and amplify biases present in their training data</li>
            <li>📜 <strong>Check IP & copyright</strong> — AI-generated content may raise copyright questions depending on jurisdiction</li>
            <li>🏷️ <strong>Disclose AI use</strong> — be transparent when AI helped create content, especially in academic or professional contexts</li>
          </ul>
          <div class="callout callout-tip">
            <strong>🎯 Best mindset:</strong> Treat AI as a brilliant but imperfect <em>collaborator</em>, not an oracle. Use it to accelerate your thinking — not to replace it. Your critical judgement is what makes the output trustworthy.
          </div>
        `
      },
      // ── Quiz 2 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "🏆 Final Quiz — GenAI Fundamentals",
        questions: [
          {
            q: "Which prompting technique involves providing examples within the prompt to guide the model's output format?",
            options: [
              "Zero-shot prompting",
              "Chain-of-thought prompting",
              "Few-shot prompting",
              "Temperature prompting"
            ],
            answer: 2,
            explanation: "Few-shot prompting includes 2-5 input/output examples in the prompt itself, showing the model exactly the format and style you want. It's very effective when zero-shot gives inconsistent results."
          },
          {
            q: "What does RAG (Retrieval-Augmented Generation) primarily solve?",
            options: [
              "Making LLMs run faster on local hardware",
              "Grounding LLM responses in up-to-date or private documents",
              "Reducing the hallucination rate to zero",
              "Training a new model from scratch on your data"
            ],
            answer: 1,
            explanation: "RAG retrieves relevant chunks from your own documents or databases and injects them into the LLM's context window. This grounds responses in real, current data — solving the knowledge cutoff and private data problems without retraining the model."
          },
          {
            q: "Which component of a well-structured prompt helps set the model's expertise level and persona?",
            options: [
              "Format",
              "Context",
              "Constraints",
              "Role"
            ],
            answer: 3,
            explanation: "The 'Role' component (e.g. 'You are a senior security engineer...') primes the model to respond from a specific perspective and expertise level. It's one of the most effective ways to improve response quality."
          },
          {
            q: "What is the most responsible approach when using AI-generated content professionally?",
            options: [
              "Use it as-is — AI is more accurate than humans",
              "Only use AI-generated content for internal documents, never public ones",
              "Always verify facts, disclose AI use where appropriate, and apply your own critical judgement",
              "Avoid AI tools entirely to eliminate risk"
            ],
            answer: 2,
            explanation: "Responsible AI use means verifying outputs (hallucinations happen), being transparent about AI assistance, protecting private data, and using your own judgement to assess quality. AI is a powerful collaborator — not a replacement for critical thinking."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  TOPIC 6: TypeScript Fundamentals
  // ─────────────────────────────────────────────────────────
  {
    id: "typescript-fundamentals",
    title: "TypeScript Fundamentals",
    icon: "🔷",
    color: "#2563eb",
    description: "Level up your JavaScript with static types. Learn how TypeScript catches bugs at compile time, makes refactoring safe, and powers modern frameworks like Angular, Next.js, and more.",
    difficulty: "Intermediate",
    estimatedTime: "35 min",
    tags: ["Programming", "Web Dev", "TypeScript"],
    sections: [
      // ── Lesson 1 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Why TypeScript?",
        content: `
          <p><strong>TypeScript</strong> is a superset of JavaScript that adds <em>static types</em>. Every valid JS file is already valid TS — TypeScript just adds optional type annotations on top.</p>
          <div class="callout callout-info">
            <strong>🧠 Core idea:</strong> JavaScript tells you about bugs <em>at runtime</em> (when the app crashes). TypeScript tells you about bugs <em>at compile time</em> (before the code even runs).
          </div>
          <h3>JavaScript vs TypeScript</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>JavaScript</th><th>TypeScript</th></tr></thead>
              <tbody>
                <tr><td>Dynamically typed</td><td>Statically typed (with inference)</td></tr>
                <tr><td>Errors found at runtime</td><td>Errors caught at compile time</td></tr>
                <tr><td>No editor autocompletion for shapes</td><td>Rich IntelliSense & autocompletion</td></tr>
                <tr><td>Refactoring is risky</td><td>Refactoring is safe & confident</td></tr>
                <tr><td>Runs directly in browsers</td><td>Compiles to JavaScript first</td></tr>
              </tbody>
            </table>
          </div>
          <h3>Who Uses TypeScript?</h3>
          <p>TypeScript is used by <strong>most large-scale projects</strong> today:</p>
          <ul>
            <li>🅰️ <strong>Angular</strong> — built entirely in TypeScript</li>
            <li>⚛️ <strong>React / Next.js</strong> — first-class TypeScript support</li>
            <li>💚 <strong>Vue 3</strong> — rewritten in TypeScript</li>
            <li>🟢 <strong>Node.js / Deno</strong> — server-side TypeScript</li>
            <li>📱 <strong>React Native</strong> — mobile apps with TypeScript</li>
          </ul>
          <h3>🚀 Getting Started</h3>
          <div class="code-block">
            <div class="code-label">Terminal</div>
            <pre><code>npm install -g typescript    # Install globally
tsc --init                   # Create tsconfig.json
tsc app.ts                   # Compile app.ts → app.js</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Key takeaway:</strong> TypeScript doesn't run in the browser — it <em>compiles</em> to plain JavaScript. The types exist only during development and are stripped out in the final output.
          </div>
        `
      },
      // ── Lesson 2 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Type Annotations & Primitives",
        content: `
          <p>TypeScript lets you annotate variables, function parameters, and return values with types. But it also <strong>infers</strong> types automatically when possible.</p>
          <h3>🏷️ Basic Type Annotations</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>// Explicit types
let name: string = "Ravi";
let age: number = 28;
let isActive: boolean = true;

// Type inference — TS figures it out
let city = "Bengaluru";   // inferred as string
let score = 95;            // inferred as number</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Best practice:</strong> Let TypeScript <em>infer</em> types when the value makes the type obvious. Only add explicit annotations when inference isn't enough (e.g. function parameters).
          </div>
          <h3>📦 Arrays & Tuples</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>// Arrays — two equivalent syntaxes
let scores: number[] = [95, 87, 92];
let names: Array<string> = ["Alice", "Bob"];

// Tuples — fixed length & fixed types per position
let user: [string, number] = ["Ravi", 28];
// user[0] is string, user[1] is number</code></pre>
          </div>
          <h3>🔧 Function Types</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>// Parameter types + return type
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function with types
const greet = (name: string): string => {
  return \`Hello, \${name}!\`;
};

// Optional parameter (?)
function log(message: string, level?: string): void {
  console.log(level ? \`[\${level}] \${message}\` : message);
}

log("Server started");           // ✅ OK
log("DB error", "ERROR");        // ✅ OK</code></pre>
          </div>
          <h3>🚫 The <code>any</code> Escape Hatch</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>let data: any = "hello";
data = 42;       // ✅ No error — any disables type checking
data = true;     // ✅ No error</code></pre>
          </div>
          <div class="callout callout-info">
            <strong>⚠️ Avoid <code>any</code></strong> — it defeats the purpose of TypeScript. If you don't know the type, use <code>unknown</code> instead, which forces you to narrow the type before using it.
          </div>
        `
      },
      // ── Quiz 1 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "⚡ Quick Check #1",
        questions: [
          {
            q: "What is the key difference between JavaScript and TypeScript?",
            options: [
              "TypeScript is a completely different language unrelated to JavaScript",
              "TypeScript adds static types to JavaScript and catches errors at compile time",
              "TypeScript runs faster than JavaScript in all cases",
              "TypeScript replaces JavaScript in the browser"
            ],
            answer: 1,
            explanation: "TypeScript is a strict superset of JavaScript — it adds optional static type annotations. These types are checked at compile time and stripped away in the final JavaScript output. TypeScript doesn't run in the browser directly."
          },
          {
            q: "What does TypeScript do with type annotations when it compiles?",
            options: [
              "Keeps them in the output JavaScript for runtime checking",
              "Converts them to JSDoc comments",
              "Strips them out — the output is plain JavaScript with no types",
              "Sends them to a separate type-check server"
            ],
            answer: 2,
            explanation: "TypeScript types exist only during development. When you compile (tsc), all type annotations are removed and the output is plain JavaScript. Types are a development-time safety net, not a runtime feature."
          },
          {
            q: "Why should you avoid using 'any' in TypeScript?",
            options: [
              "It causes runtime errors",
              "It makes the code run slower",
              "It disables type checking, defeating the purpose of TypeScript",
              "It is not valid TypeScript syntax"
            ],
            answer: 2,
            explanation: "'any' tells TypeScript to skip all type checking for that value. This effectively turns off TypeScript's safety for that variable. Use 'unknown' instead — it's safer because it forces you to narrow the type before using it."
          }
        ]
      },
      // ── Lesson 3 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Interfaces & Custom Types",
        content: `
          <p>Real-world applications work with complex data — user objects, API responses, config settings. TypeScript's <strong>interfaces</strong> and <strong>type aliases</strong> let you describe these shapes precisely.</p>
          <h3>📐 Interfaces — Describing Object Shapes</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
  bio?: string;          // optional property
}

const user: User = {
  id: 1,
  name: "Ravi",
  email: "ravi@example.com",
  isAdmin: false
  // bio is optional, so omitting it is fine
};</code></pre>
          </div>
          <h3>🆚 Interface vs Type Alias</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>// Type alias — can describe ANY type
type Status = "active" | "inactive" | "banned";
type ID = string | number;

// Interface — best for object shapes
interface Product {
  name: string;
  price: number;
}

// Extending interfaces
interface DigitalProduct extends Product {
  downloadUrl: string;
  fileSizeMb: number;
}</code></pre>
          </div>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Feature</th><th>Interface</th><th>Type Alias</th></tr></thead>
              <tbody>
                <tr><td>Object shapes</td><td>✅ Primary use</td><td>✅ Works too</td></tr>
                <tr><td>Extending</td><td><code>extends</code></td><td><code>&</code> (intersection)</td></tr>
                <tr><td>Union types</td><td>❌</td><td>✅ <code>string | number</code></td></tr>
                <tr><td>Declaration merging</td><td>✅</td><td>❌</td></tr>
              </tbody>
            </table>
          </div>
          <h3>🔀 Union & Literal Types</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>// Union type — value can be one of several types
type Result = "success" | "error" | "loading";

function showStatus(status: Result): string {
  switch (status) {
    case "success": return "✅ Done!";
    case "error":   return "❌ Failed!";
    case "loading": return "⏳ Loading...";
  }
}

// Narrowing — TypeScript tracks type through conditions
function print(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // TS knows it's string here
  } else {
    console.log(value.toFixed(2));     // TS knows it's number here
  }
}</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Rule of thumb:</strong> Use <code>interface</code> for object shapes (especially if they'll be extended). Use <code>type</code> for unions, primitives, and more complex type expressions.
          </div>
        `
      },
      // ── Lesson 4 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Generics & Utility Types",
        content: `
          <p><strong>Generics</strong> let you write reusable, type-safe code that works with <em>any</em> type — without losing type information. They're the key to writing flexible yet safe TypeScript.</p>
          <h3>🧬 Generics — Type Parameters</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>// Without generics — loses type info
function first(arr: any[]): any {
  return arr[0];
}

// With generics — preserves type info
function first<T>(arr: T[]): T {
  return arr[0];
}

first([1, 2, 3]);         // returns number
first(["a", "b", "c"]);   // returns string
// TypeScript knows the return type automatically!</code></pre>
          </div>
          <div class="callout callout-info">
            <strong>💡 Think of <code>&lt;T&gt;</code></strong> like a placeholder that gets filled in when you call the function. It's a "type variable" — it lets the function adapt to whatever type you pass in.
          </div>
          <h3>📦 Generic Interfaces</h3>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage — T becomes User
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Ravi", email: "r@e.com", isAdmin: false },
  status: 200,
  message: "OK"
};

// T becomes string[]
const tagsResponse: ApiResponse<string[]> = {
  data: ["typescript", "javascript"],
  status: 200,
  message: "OK"
};</code></pre>
          </div>
          <h3>🛠️ Built-in Utility Types</h3>
          <p>TypeScript ships with powerful utility types that transform existing types:</p>
          <div class="code-block">
            <div class="code-label">TypeScript</div>
            <pre><code>interface User {
  id: number;
  name: string;
  email: string;
}

// Partial — all properties become optional
type UpdateUser = Partial<User>;
// { id?: number; name?: string; email?: string }

// Pick — select specific properties
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string }

// Omit — exclude specific properties
type CreateUser = Omit<User, "id">;
// { name: string; email: string }

// Readonly — all properties become readonly
type FrozenUser = Readonly<User>;
// Cannot reassign any property after creation

// Record — create an object type with typed keys & values
type RoleMap = Record<string, string[]>;
// { [key: string]: string[] }</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 Power tip:</strong> Utility types compose beautifully. <code>Partial&lt;Pick&lt;User, "name" | "email"&gt;&gt;</code> gives you an object where <code>name</code> and <code>email</code> are both optional. This is incredibly useful for update/patch operations.
          </div>
        `
      },
      // ── Quiz 2 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "🏆 Final Quiz — TypeScript Fundamentals",
        questions: [
          {
            q: "What does the Partial<T> utility type do?",
            options: [
              "Removes all properties from a type",
              "Makes all properties required",
              "Makes all properties optional",
              "Picks only string properties"
            ],
            answer: 2,
            explanation: "Partial<T> takes a type T and returns a new type where every property is optional (?). It's very useful for update/patch functions where you only want to send changed fields."
          },
          {
            q: "What is the purpose of generics in TypeScript?",
            options: [
              "To make functions run faster at runtime",
              "To write reusable code that preserves type information across different types",
              "To convert JavaScript to TypeScript automatically",
              "To create global variables accessible everywhere"
            ],
            answer: 1,
            explanation: "Generics let you write functions, classes, and interfaces that work with any type while still maintaining full type safety. Without generics, you'd have to use 'any' (losing type info) or write separate functions for every type."
          },
          {
            q: "When should you use an interface vs a type alias in TypeScript?",
            options: [
              "Always use interfaces, type aliases are deprecated",
              "Always use type aliases, interfaces are legacy",
              "Use interfaces for object shapes (especially extendable); use type aliases for unions and complex types",
              "They are identical in every way — use whichever you prefer"
            ],
            answer: 2,
            explanation: "Interfaces are ideal for defining object shapes, especially when you want to extend them. Type aliases are more flexible — they can describe unions (string | number), intersections, and other complex type expressions that interfaces cannot."
          },
          {
            q: "What will TypeScript do with this code?\n\nconst x: string = 42;",
            options: [
              "Run fine — TypeScript auto-converts 42 to \"42\"",
              "Throw a runtime error when executed",
              "Show a compile-time error: Type 'number' is not assignable to type 'string'",
              "Ignore the type annotation and infer number"
            ],
            answer: 2,
            explanation: "TypeScript catches this at compile time — you declared x as string but assigned a number. This is the core value of TypeScript: catching type mismatches before your code ever runs."
          }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────
  //  TOPIC 7: SQL & Databases
  // ─────────────────────────────────────────────────────────
  {
    id: "sql-databases",
    title: "SQL & Databases",
    icon: "🗄️",
    color: "#dc2626",
    description: "Master the language of data. Learn how relational databases store information, write powerful SQL queries, and understand core concepts like joins, indexes, and schema design.",
    difficulty: "Beginner",
    estimatedTime: "35 min",
    tags: ["Databases", "SQL", "Backend"],
    sections: [
      // ── Lesson 1 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "What are Databases?",
        content: `
          <p>A <strong>database</strong> is an organised collection of data stored electronically. Almost every application you use — from Instagram to your bank — is powered by a database behind the scenes.</p>
          <div class="callout callout-info">
            <strong>🧠 Core idea:</strong> Without a database, your app's data disappears the moment the server restarts. Databases provide <em>persistent, structured, and queryable</em> storage.
          </div>
          <h3>Relational vs Non-Relational</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>Relational (SQL)</th><th>Non-Relational (NoSQL)</th></tr></thead>
              <tbody>
                <tr><td>Data in <strong>tables</strong> (rows & columns)</td><td>Data in documents, key-value, or graphs</td></tr>
                <tr><td>Fixed schema — structure defined upfront</td><td>Flexible schema — structure can vary</td></tr>
                <tr><td>SQL query language</td><td>Varies (MongoDB uses JSON-like queries)</td></tr>
                <tr><td>Strong consistency & ACID compliance</td><td>Often eventual consistency for scale</td></tr>
                <tr><td>MySQL, PostgreSQL, SQLite</td><td>MongoDB, Redis, DynamoDB, Cassandra</td></tr>
              </tbody>
            </table>
          </div>
          <h3>📊 How Relational Data Looks</h3>
          <p>Think of a <strong>table</strong> like a spreadsheet:</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>id</th><th>name</th><th>email</th><th>role</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Ravi</td><td>ravi@example.com</td><td>admin</td></tr>
                <tr><td>2</td><td>Priya</td><td>priya@example.com</td><td>editor</td></tr>
                <tr><td>3</td><td>Arjun</td><td>arjun@example.com</td><td>viewer</td></tr>
              </tbody>
            </table>
          </div>
          <ul>
            <li>📋 <strong>Table</strong> — a collection of related data (e.g. <code>users</code>)</li>
            <li>📄 <strong>Row</strong> (Record) — a single entry (e.g. one user)</li>
            <li>📊 <strong>Column</strong> (Field) — a specific attribute (e.g. <code>email</code>)</li>
            <li>🔑 <strong>Primary Key</strong> — a unique identifier for each row (e.g. <code>id</code>)</li>
          </ul>
          <div class="callout callout-tip">
            <strong>🎯 This course focuses on SQL</strong> — the standard language for relational databases. The concepts you learn here apply to MySQL, PostgreSQL, SQLite, SQL Server, and more.
          </div>
        `
      },
      // ── Lesson 2 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Core SQL — SELECT Queries",
        content: `
          <p><strong>SQL</strong> (Structured Query Language) is the standard language for interacting with relational databases. The most common operation? <strong>SELECT</strong> — reading data.</p>
          <h3>📖 Basic SELECT</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Select all columns from a table
SELECT * FROM users;

-- Select specific columns
SELECT name, email FROM users;

-- Limit results
SELECT name FROM users LIMIT 5;</code></pre>
          </div>
          <h3>🔍 Filtering with WHERE</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Exact match
SELECT * FROM users WHERE role = 'admin';

-- Comparison operators
SELECT * FROM products WHERE price > 100;
SELECT * FROM products WHERE price BETWEEN 50 AND 200;

-- Pattern matching
SELECT * FROM users WHERE name LIKE 'R%';    -- starts with R
SELECT * FROM users WHERE email LIKE '%@gmail.com';

-- Multiple conditions
SELECT * FROM users WHERE role = 'editor' AND is_active = true;
SELECT * FROM users WHERE role = 'admin' OR role = 'editor';

-- NULL checks
SELECT * FROM users WHERE bio IS NULL;
SELECT * FROM users WHERE bio IS NOT NULL;</code></pre>
          </div>
          <h3>📊 Sorting & Aggregating</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Sort results
SELECT * FROM products ORDER BY price ASC;     -- cheapest first
SELECT * FROM products ORDER BY price DESC;    -- most expensive first

-- Aggregate functions
SELECT COUNT(*) FROM users;                    -- total rows
SELECT AVG(price) FROM products;               -- average price
SELECT MAX(price), MIN(price) FROM products;   -- max and min

-- Group by category
SELECT category, COUNT(*) as total
FROM products
GROUP BY category
ORDER BY total DESC;</code></pre>
          </div>
          <div class="callout callout-tip">
            <strong>🎯 SQL keywords</strong> like <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code> are case-insensitive — but writing them in UPPERCASE is a widely followed convention for readability.
          </div>
        `
      },
      // ── Quiz 1 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "⚡ Quick Check #1",
        questions: [
          {
            q: "What is a 'Primary Key' in a relational database?",
            options: [
              "The first column in every table",
              "A unique identifier for each row in a table",
              "The password used to access the database",
              "The most important table in the database"
            ],
            answer: 1,
            explanation: "A primary key uniquely identifies each row in a table. No two rows can have the same primary key value, and it cannot be NULL. Common examples include auto-incrementing IDs."
          },
          {
            q: "What does this SQL return?\\n\\nSELECT name FROM users WHERE role = 'admin' ORDER BY name ASC;",
            options: [
              "All columns for admin users, sorted alphabetically",
              "Only the name column for admin users, sorted A→Z",
              "All users sorted by role",
              "Counts how many admins exist"
            ],
            answer: 1,
            explanation: "This query selects only the 'name' column, filters to rows where role is 'admin', and sorts the results alphabetically (ASC = ascending = A→Z)."
          },
          {
            q: "Which SQL keyword is used to filter groups created by GROUP BY?",
            options: [
              "WHERE",
              "FILTER",
              "HAVING",
              "GROUP WHERE"
            ],
            answer: 2,
            explanation: "WHERE filters individual rows before grouping. HAVING filters groups after GROUP BY has been applied. For example: HAVING COUNT(*) > 5 shows only groups with more than 5 items."
          }
        ]
      },
      // ── Lesson 3 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "JOINs — Connecting Tables",
        content: `
          <p>Real databases split data across <strong>multiple tables</strong> to avoid repetition. <strong>JOINs</strong> let you combine data from two or more tables based on a shared column.</p>
          <h3>📊 Example: Two Related Tables</h3>
          <p><strong>users</strong> table:</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>id</th><th>name</th><th>email</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>Ravi</td><td>ravi@example.com</td></tr>
                <tr><td>2</td><td>Priya</td><td>priya@example.com</td></tr>
              </tbody>
            </table>
          </div>
          <p><strong>orders</strong> table:</p>
          <div class="comparison-table">
            <table>
              <thead><tr><th>order_id</th><th>user_id</th><th>product</th><th>amount</th></tr></thead>
              <tbody>
                <tr><td>101</td><td>1</td><td>Laptop</td><td>75000</td></tr>
                <tr><td>102</td><td>1</td><td>Mouse</td><td>1500</td></tr>
                <tr><td>103</td><td>2</td><td>Keyboard</td><td>3000</td></tr>
              </tbody>
            </table>
          </div>
          <h3>🔗 INNER JOIN — Only Matching Rows</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>SELECT users.name, orders.product, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- Result:
-- Ravi  | Laptop   | 75000
-- Ravi  | Mouse    | 1500
-- Priya | Keyboard | 3000</code></pre>
          </div>
          <h3>🔀 Types of JOINs</h3>
          <div class="comparison-table">
            <table>
              <thead><tr><th>JOIN Type</th><th>Returns</th></tr></thead>
              <tbody>
                <tr><td><strong>INNER JOIN</strong></td><td>Only rows that match in <em>both</em> tables</td></tr>
                <tr><td><strong>LEFT JOIN</strong></td><td>All rows from left table + matching from right (NULL if no match)</td></tr>
                <tr><td><strong>RIGHT JOIN</strong></td><td>All rows from right table + matching from left</td></tr>
                <tr><td><strong>FULL OUTER JOIN</strong></td><td>All rows from both tables (NULL where no match)</td></tr>
              </tbody>
            </table>
          </div>
          <h3>⬅️ LEFT JOIN — Keep All From Left Table</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Find ALL users, even those with no orders
SELECT users.name, orders.product
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- If a user has no orders, product shows as NULL</code></pre>
          </div>
          <h3>🔑 Foreign Keys</h3>
          <p>The <code>user_id</code> column in orders is a <strong>foreign key</strong> — it references the <code>id</code> column in users. This creates a relationship between the two tables and ensures data integrity.</p>
          <div class="callout callout-tip">
            <strong>🎯 When to use which JOIN:</strong> Use <code>INNER JOIN</code> when you only want rows with matches in both tables. Use <code>LEFT JOIN</code> when you want all records from the "main" table even if there's no match in the joined table.
          </div>
        `
      },
      // ── Lesson 4 ──────────────────────────────────────────
      {
        type: "lesson",
        title: "Modifying Data & Schema Design",
        content: `
          <p>SQL isn't just for reading data — you can also <strong>create, insert, update, and delete</strong> data and tables.</p>
          <h3>🏗️ Creating Tables</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>CREATE TABLE users (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(255) UNIQUE NOT NULL,
  role      VARCHAR(20) DEFAULT 'viewer',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);</code></pre>
          </div>
          <h3>➕ Inserting Data</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Insert a single row
INSERT INTO users (name, email, role)
VALUES ('Ravi', 'ravi@example.com', 'admin');

-- Insert multiple rows
INSERT INTO users (name, email) VALUES
  ('Priya', 'priya@example.com'),
  ('Arjun', 'arjun@example.com');</code></pre>
          </div>
          <h3>✏️ Updating Data</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Update specific rows
UPDATE users SET role = 'editor' WHERE name = 'Priya';

-- Update multiple columns
UPDATE products SET price = 999, stock = 50 WHERE id = 42;</code></pre>
          </div>
          <div class="callout callout-info">
            <strong>⚠️ Always use WHERE with UPDATE and DELETE!</strong> Without a WHERE clause, the operation applies to <em>every row</em> in the table. <code>DELETE FROM users;</code> deletes ALL users — not what you want!
          </div>
          <h3>🗑️ Deleting Data</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Delete specific rows
DELETE FROM users WHERE id = 3;

-- Delete all inactive users
DELETE FROM users WHERE is_active = false;</code></pre>
          </div>
          <h3>⚡ Indexes — Speeding Up Queries</h3>
          <div class="code-block">
            <div class="code-label">SQL</div>
            <pre><code>-- Create an index on email (speeds up WHERE email = '...')
CREATE INDEX idx_users_email ON users(email);

-- Composite index (speeds up queries filtering on both columns)
CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);</code></pre>
          </div>
          <p>Indexes work like a book's index — instead of scanning every page (row), the database jumps directly to the right location. Add indexes on columns you frequently <code>WHERE</code>, <code>JOIN</code>, or <code>ORDER BY</code>.</p>
          <div class="callout callout-tip">
            <strong>🎯 Schema design tips:</strong> (1) Every table should have a primary key. (2) Use foreign keys to enforce relationships. (3) Don't duplicate data — normalise into separate tables. (4) Index columns you query often.
          </div>
        `
      },
      // ── Quiz 2 ────────────────────────────────────────────
      {
        type: "quiz",
        title: "🏆 Final Quiz — SQL & Databases",
        questions: [
          {
            q: "What does an INNER JOIN return?",
            options: [
              "All rows from both tables, with NULLs where there's no match",
              "All rows from the left table, with NULLs for unmatched right rows",
              "Only rows that have matching values in both tables",
              "The first 10 rows from both tables combined"
            ],
            answer: 2,
            explanation: "INNER JOIN returns only the rows where there is a match in both tables based on the join condition. Rows without a match in either table are excluded from the result."
          },
          {
            q: "What happens if you run DELETE FROM users; without a WHERE clause?",
            options: [
              "Nothing — SQL requires a WHERE clause for DELETE",
              "It deletes only the first row",
              "It deletes ALL rows in the users table",
              "It drops (removes) the entire table"
            ],
            answer: 2,
            explanation: "DELETE FROM users; without WHERE deletes every single row in the table! The table structure remains (unlike DROP TABLE), but all data is gone. Always double-check your WHERE clause before running DELETE or UPDATE."
          },
          {
            q: "What is the purpose of a database index?",
            options: [
              "To encrypt sensitive data in the table",
              "To speed up query performance on frequently searched columns",
              "To create a backup of the table",
              "To enforce unique constraints on all columns"
            ],
            answer: 1,
            explanation: "An index is a data structure that speeds up data retrieval — like a book's index lets you find a topic without reading every page. Add indexes on columns used in WHERE, JOIN, and ORDER BY clauses."
          },
          {
            q: "What is a foreign key?",
            options: [
              "A key used to encrypt data between tables",
              "The primary key of a table",
              "A column that references the primary key of another table, creating a relationship",
              "A special key that allows access from external applications"
            ],
            answer: 2,
            explanation: "A foreign key is a column in one table that references the primary key of another table. It creates a relationship between the two tables and enforces referential integrity — you can't insert a user_id that doesn't exist in the users table."
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
