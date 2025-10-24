# Interactive Quiz App in Python

def run_quiz(questions):
    score = 0

    for q in questions:
        print("\n" + q["question"])
        for option in q["options"]:
            print(option)

        answer = input("Enter your answer (A/B/C/D): ").strip().upper()

        if answer == q["answer"]:
            print("✅ Correct!")
            score += 1
        else:
            print(f"❌ Wrong! The correct answer is {q['answer']}")

    print(f"\nYour final score: {score}/{len(questions)}")


if __name__ == "__main__":
    quiz_questions = [
        {
            "question": "1. What does CPU stand for?",
            "options": ["A. Central Processing Unit", "B. Control Program Unit", "C. Computer Power Unit", "D. Central Power Utility"],
            "answer": "A"
        },
        {
            "question": "2. Which language is mainly used for web development?",
            "options": ["A. Python", "B. JavaScript", "C. C++", "D. Java"],
            "answer": "B"
        },
        {
            "question": "3. Which of the following is an Operating System?",
            "options": ["A. Windows", "B. Google", "C. Facebook", "D. Intel"],
            "answer": "A"
        }
    ]

    print("Welcome to the Quiz App!")
    run_quiz(quiz_questions)

