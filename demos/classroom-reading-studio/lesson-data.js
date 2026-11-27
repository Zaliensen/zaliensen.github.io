/* Newly authored neutral practice text; no original book text or learner data. */
window.LESSON_DATA = {
  "title": "Classroom Reading Studio",
  "pages": [
    {
      "title": "Read STOP",
      "text": "This word card says STOP. It has four letters.",
      "context": "Read each word, then match it below.",
      "tasks": [
        {
          "kind": "choice",
          "skill": "Reading comprehension",
          "prompt": "Find the matching printed word.",
          "answer": "STOP",
          "choices": [
            "STOP",
            "EXIT",
            "HELP"
          ],
          "model": "Match all four letters: S T O P."
        },
        {
          "kind": "choice",
          "skill": "Letter identification",
          "prompt": "Which letter begins STOP?",
          "answer": "S",
          "choices": [
            "S",
            "M",
            "T"
          ],
          "model": "STOP begins with S."
        },
        {
          "kind": "build",
          "skill": "Supported letter sequencing",
          "prompt": "Build STOP one letter at a time.",
          "word": "STOP",
          "model": "The letters are S · T · O · P."
        }
      ]
    },
    {
      "title": "Read EXIT",
      "text": "This word card says EXIT. Read each letter in order.",
      "context": "Read the letters from left to right.",
      "tasks": [
        {
          "kind": "choice",
          "skill": "Reading comprehension",
          "prompt": "Find the matching printed word.",
          "answer": "EXIT",
          "choices": [
            "HELP",
            "EXIT",
            "STOP"
          ],
          "model": "Match E X I T."
        },
        {
          "kind": "choice",
          "skill": "Letter identification",
          "prompt": "Which letter begins EXIT?",
          "answer": "E",
          "choices": [
            "E",
            "M",
            "T"
          ],
          "model": "EXIT begins with E."
        },
        {
          "kind": "build",
          "skill": "Supported letter sequencing",
          "prompt": "Build EXIT one letter at a time.",
          "word": "EXIT",
          "model": "The letters are E · X · I · T."
        }
      ]
    },
    {
      "title": "Read HELP",
      "text": "This word card says HELP. We can practice asking for help.",
      "context": "Choose a word or ask for a model.",
      "tasks": [
        {
          "kind": "choice",
          "skill": "Reading comprehension",
          "prompt": "Find the matching printed word.",
          "answer": "HELP",
          "choices": [
            "EXIT",
            "STOP",
            "HELP"
          ],
          "model": "Match H E L P."
        },
        {
          "kind": "choice",
          "skill": "Letter identification",
          "prompt": "Which letter begins HELP?",
          "answer": "H",
          "choices": [
            "H",
            "M",
            "T"
          ],
          "model": "HELP begins with H."
        },
        {
          "kind": "build",
          "skill": "Supported letter sequencing",
          "prompt": "Build HELP one letter at a time.",
          "word": "HELP",
          "model": "The letters are H · E · L · P."
        }
      ]
    }
  ]
};
