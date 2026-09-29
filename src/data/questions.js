export const questions = [
  {
    id: 1, question: "What does AI stand for?",
    options: ["Artificial Intelligence", "Automated Integration", "Advanced Interface", "Auto Intelligence"],
    correctAnswer: 0, explanation: "AI stands for Artificial Intelligence - the simulation of human intelligence by machines.",
    difficulty: "easy", category: "AI Fundamentals"
  },
  {
    id: 2, question: "Which of these is NOT a type of machine learning?",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforced Learning", "Automated Learning"],
    correctAnswer: 3, explanation: "The three main types are Supervised, Unsupervised, and Reinforcement Learning. 'Automated Learning' is not a standard ML type.",
    difficulty: "easy", category: "Machine Learning"
  },
  {
    id: 3, question: "What is a neural network?",
    options: ["A computer network", "A computing system inspired by biological neural networks", "A type of database", "A security protocol"],
    correctAnswer: 1, explanation: "Neural networks are computing systems inspired by biological neural networks that constitute animal brains.",
    difficulty: "easy", category: "Neural Networks"
  },
  {
    id: 4, question: "What is Deep Learning?",
    options: ["Learning at night", "A subset of ML using deep neural networks", "Deep web analysis", "Advanced database queries"],
    correctAnswer: 1, explanation: "Deep Learning is a subset of machine learning that uses neural networks with many layers (deep neural networks).",
    difficulty: "easy", category: "Deep Learning"
  },
  {
    id: 5, question: "What does NLP stand for?",
    options: ["Natural Language Processing", "Network Layer Protocol", "Neural Learning Process", "New Language Programming"],
    correctAnswer: 0, explanation: "NLP stands for Natural Language Processing - the ability of computers to understand human language.",
    difficulty: "easy", category: "NLP"
  },
  {
    id: 6, question: "What is overfitting in machine learning?",
    options: ["Training too long", "Model performs well on training data but poorly on new data", "Using too much memory", "Having too many features"],
    correctAnswer: 1, explanation: "Overfitting occurs when a model learns the training data too well, including noise, and performs poorly on unseen data.",
    difficulty: "medium", category: "Machine Learning"
  },
  {
    id: 7, question: "What is a convolutional neural network (CNN) primarily used for?",
    options: ["Text analysis", "Image recognition and processing", "Audio processing", "Database management"],
    correctAnswer: 1, explanation: "CNNs are primarily used for image recognition and processing tasks, though they can also be used for other types of data.",
    difficulty: "medium", category: "Neural Networks"
  },
  {
    id: 8, question: "What is transfer learning?",
    options: ["Moving data between servers", "Using a pre-trained model as starting point for a new task", "Transferring files quickly", "Learning to transfer data"],
    correctAnswer: 1, explanation: "Transfer learning involves taking a pre-trained model and fine-tuning it for a new, related task.",
    difficulty: "medium", category: "Machine Learning"
  },
  {
    id: 9, question: "What is the purpose of a loss function?",
    options: ["To lose data", "To measure how wrong the model's predictions are", "To calculate profit", "To manage memory"],
    correctAnswer: 1, explanation: "A loss function measures the difference between predicted and actual values, helping the model learn by minimizing this difference.",
    difficulty: "medium", category: "Machine Learning"
  },
  {
    id: 10, question: "What is reinforcement learning?",
    options: ["Learning from reinforcement bars", "Learning through trial and error with rewards/penalties", "Learning with a teacher", "Learning from textbooks"],
    correctAnswer: 1, explanation: "Reinforcement learning is a type of ML where an agent learns to make decisions by taking actions and receiving rewards or penalties.",
    difficulty: "medium", category: "Reinforcement Learning"
  },
  {
    id: 11, question: "What is a transformer in AI?",
    options: ["A robot transformer", "A neural network architecture for sequence processing", "A type of CPU", "A data compression tool"],
    correctAnswer: 1, explanation: "Transformers are neural network architectures that process sequential data using self-attention mechanisms, foundational for modern LLMs.",
    difficulty: "medium", category: "Deep Learning"
  },
  {
    id: 12, question: "What is GPT?",
    options: ["General Purpose Technology", "Generative Pre-trained Transformer", "Global Processing Terminal", "Graph Processing Tool"],
    correctAnswer: 1, explanation: "GPT stands for Generative Pre-trained Transformer - a type of large language model developed by OpenAI.",
    difficulty: "easy", category: "LLM"
  },
  {
    id: 13, question: "What is prompt engineering?",
    options: ["Fixing prompts", "Designing effective inputs for AI models", "Building prompt displays", "Engineering prompts for robots"],
    correctAnswer: 1, explanation: "Prompt engineering is the practice of designing and optimizing inputs (prompts) to get better outputs from AI models.",
    difficulty: "easy", category: "Prompt Engineering"
  },
  {
    id: 14, question: "What is AI hallucination?",
    options: ["AI seeing ghosts", "AI generating confident but incorrect information", "AI dreaming", "AI visual processing"],
    correctAnswer: 1, explanation: "AI hallucination is when an AI model generates plausible-sounding but factually incorrect or fabricated information.",
    difficulty: "medium", category: "AI Ethics"
  },
  {
    id: 15, question: "What is fine-tuning?",
    options: ["Adjusting volume", "Further training a pre-trained model on specific data", "Fine-tuning display settings", "Cleaning data"],
    correctAnswer: 1, explanation: "Fine-tuning is the process of taking a pre-trained model and training it further on a specific dataset for a particular task.",
    difficulty: "medium", category: "Machine Learning"
  },
  {
    id: 16, question: "What is an epoch in machine learning?",
    options: ["A historical period", "One complete pass through the training dataset", "A type of neural network", "A measurement of speed"],
    correctAnswer: 1, explanation: "An epoch is one complete pass through the entire training dataset during model training.",
    difficulty: "medium", category: "Machine Learning"
  },
  {
    id: 17, question: "What is the vanishing gradient problem?",
    options: ["Gradients disappearing from calculations", "Gradients becoming too small during backpropagation", "Gradients being negative", "Gradients in vanish mode"],
    correctAnswer: 1, explanation: "The vanishing gradient problem occurs when gradients become very small during backpropagation, making it hard to train deep networks.",
    difficulty: "hard", category: "Deep Learning"
  },
  {
    id: 18, question: "What is attention mechanism in transformers?",
    options: ["Paying attention to data", "Mechanism to weigh importance of different parts of input", "A type of memory", "Focus mode for AI"],
    correctAnswer: 1, explanation: "Attention mechanisms allow models to weigh the importance of different parts of the input when producing output.",
    difficulty: "hard", category: "Deep Learning"
  },
  {
    id: 19, question: "What is a GAN (Generative Adversarial Network)?",
    options: ["A type of GAN game", "Two neural networks competing - one generates, one discriminates", "A network of GANs", "A General AI Network"],
    correctAnswer: 1, explanation: "GANs consist of two neural networks - a generator that creates content and a discriminator that evaluates it - competing against each other.",
    difficulty: "hard", category: "Deep Learning"
  },
  {
    id: 20, question: "What is RLHF in AI?",
    options: ["Really Large Human Feedback", "Reinforcement Learning from Human Feedback", "Random Learning with Human Factors", "Real-time Learning with Human Fix"],
    correctAnswer: 1, explanation: "RLHF stands for Reinforcement Learning from Human Feedback - a technique used to align AI models with human preferences.",
    difficulty: "hard", category: "AI Ethics"
  },
  {
    id: 21, question: "What is a tokenizer in NLP?",
    options: ["A token generator", "A tool that breaks text into smaller units (tokens)", "A type of security token", "A currency converter"],
    correctAnswer: 1, explanation: "Tokenizers break text into smaller units called tokens (words, subwords, or characters) for processing by AI models.",
    difficulty: "medium", category: "NLP"
  },
  {
    id: 22, question: "What is RAG (Retrieval-Augmented Generation)?",
    options: ["Random Augmented Generation", "Combining retrieval from external sources with generation", "A type of RAG game", "Rapid AI Generation"],
    correctAnswer: 1, explanation: "RAG combines retrieving relevant information from external knowledge bases with generative AI to produce more accurate responses.",
    difficulty: "hard", category: "LLM"
  },
  {
    id: 23, question: "What is a foundation model?",
    options: ["A building foundation", "A large pre-trained model that can be adapted to many tasks", "A basic neural network", "A type of database"],
    correctAnswer: 1, explanation: "Foundation models are large pre-trained models that serve as a base for many downstream tasks through fine-tuning.",
    difficulty: "medium", category: "LLM"
  },
  {
    id: 24, question: "What is multimodal AI?",
    options: ["AI with multiple modes", "AI that can process multiple types of data (text, image, audio)", "AI with multiple screens", "AI running on multiple devices"],
    correctAnswer: 1, explanation: "Multimodal AI can process and understand multiple types of input like text, images, audio, and video.",
    difficulty: "medium", category: "AI Fundamentals"
  },
  {
    id: 25, question: "What is an embedding in AI?",
    options: ["Embedding code in apps", "Converting data into numerical vectors for processing", "Embedding images in text", "A type of neural network"],
    correctAnswer: 1, explanation: "Embeddings convert data (text, images) into numerical vectors that capture semantic meaning for AI processing.",
    difficulty: "medium", category: "NLP"
  },
  {
    id: 26, question: "What is unsupervised learning?",
    options: ["Learning without a computer", "Finding patterns in data without labeled examples", "Learning at your own pace", "Learning without internet"],
    correctAnswer: 1, explanation: "Unsupervised learning finds patterns and structures in data without using labeled training examples.",
    difficulty: "easy", category: "Machine Learning"
  },
  {
    id: 27, question: "What is a dataset in AI?",
    options: ["A data seating area", "A collection of data used to train and test AI models", "A type of network", "A data backup"],
    correctAnswer: 1, explanation: "A dataset is a structured collection of data used to train, validate, and test AI models.",
    difficulty: "easy", category: "AI Fundamentals"
  },
  {
    id: 28, question: "What is computer vision?",
    options: ["Vision for computers", "AI that can interpret and understand visual information from images/videos", "Computer screen settings", "A type of glasses for computers"],
    correctAnswer: 1, explanation: "Computer vision is a field of AI that enables computers to interpret and understand visual information from images and videos.",
    difficulty: "easy", category: "Computer Vision"
  },
  {
    id: 29, question: "What is bias in AI?",
    options: ["AI being biased against users", "Systematic errors that create unfair outcomes in AI systems", "AI preferring certain brands", "AI having a bias setting"],
    correctAnswer: 1, explanation: "AI bias refers to systematic and repeatable errors that create unfair outcomes, often stemming from training data or algorithm design.",
    difficulty: "medium", category: "AI Ethics"
  },
  {
    id: 30, question: "What is inference in AI?",
    options: ["Guessing answers", "The process of using a trained model to make predictions", "Inventing new things", "A type of learning"],
    correctAnswer: 1, explanation: "Inference is the process of using a trained machine learning model to make predictions on new, unseen data.",
    difficulty: "medium", category: "AI Fundamentals"
  }
];
