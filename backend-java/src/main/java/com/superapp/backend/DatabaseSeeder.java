package com.superapp.backend;

import com.superapp.backend.model.*;
import com.superapp.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    InternshipRepository internshipRepository;

    @Autowired
    NoteRepository noteRepository;

    @Override
    public void run(String... args) throws Exception {
        // Automatically insert required roles into the MongoDB database if they don't exist
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            Role userRole = new Role(ERole.ROLE_USER);
            roleRepository.save(userRole);
            System.out.println("Inserted ROLE_USER into database.");
        }
        
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            Role adminRole = new Role(ERole.ROLE_ADMIN);
            roleRepository.save(adminRole);
            System.out.println("Inserted ROLE_ADMIN into database.");
        }

        // Seed Internships if empty
        if (internshipRepository.count() == 0) {
            seedInternships();
            System.out.println("Seeded internship data.");
        }

        // Seed Notes if empty
        if (noteRepository.count() == 0) {
            seedNotes();
            System.out.println("Seeded CS notes data.");
        }
    }

    private void seedInternships() {
        List<Internship> internships = Arrays.asList(
            createInternship("Software Engineering Intern", "Google", "Bangalore, India", "Summer Internship", "₹80,000/month",
                "Work on large-scale distributed systems and contribute to products used by billions. Join a team focused on Cloud, AI, or Search infrastructure.",
                Arrays.asList("Data Structures", "Algorithms", "System Design", "Java/Python/C++"),
                "https://careers.google.com/students/"),

            createInternship("Software Developer Intern", "Microsoft", "Hyderabad, India", "Summer Internship", "₹70,000/month",
                "Build features for Azure, Office 365, or Windows. Collaborate with experienced engineers to ship production-grade code at scale.",
                Arrays.asList("C#/.NET", "Cloud Computing", "REST APIs", "Problem Solving"),
                "https://careers.microsoft.com/students/"),

            createInternship("SDE Intern", "Amazon", "Bangalore, India", "6 Month Internship", "₹60,000/month",
                "Develop scalable solutions for Amazon's e-commerce platform, AWS services, or Alexa. Work in an agile, customer-obsessed team.",
                Arrays.asList("Java", "AWS", "Distributed Systems", "OOP"),
                "https://www.amazon.jobs/en/teams/internships-for-students"),

            createInternship("Backend Developer Intern", "Flipkart", "Bangalore, India", "Summer Internship", "₹50,000/month",
                "Build microservices and APIs that power India's leading e-commerce platform. Work on high-throughput, low-latency backend systems.",
                Arrays.asList("Java/Go", "Microservices", "SQL/NoSQL", "Spring Boot"),
                "https://www.flipkartcareers.com/"),

            createInternship("Data Science Intern", "Swiggy", "Bangalore, India", "3 Month Internship", "₹40,000/month",
                "Apply ML models to optimize delivery routes, demand forecasting, and personalized recommendations for millions of users.",
                Arrays.asList("Python", "Machine Learning", "SQL", "Statistics"),
                "https://careers.swiggy.com/"),

            createInternship("Full Stack Developer Intern", "Razorpay", "Bangalore, India", "Summer Internship", "₹45,000/month",
                "Build and maintain fintech products handling millions of transactions daily. Work across frontend and backend microservices.",
                Arrays.asList("React", "Node.js/Go", "PostgreSQL", "REST APIs"),
                "https://razorpay.com/careers/"),

            createInternship("ML Research Intern", "Adobe", "Noida, India", "6 Month Internship", "₹55,000/month",
                "Research and develop state-of-the-art deep learning models for creative applications in Photoshop, Premiere Pro, and more.",
                Arrays.asList("Deep Learning", "PyTorch/TensorFlow", "Computer Vision", "NLP"),
                "https://www.adobe.com/careers/university.html"),

            createInternship("Platform Engineering Intern", "Uber", "Hyderabad, India", "Summer Internship", "₹65,000/month",
                "Build scalable infrastructure for ride-sharing and delivery platforms serving millions of trips daily worldwide.",
                Arrays.asList("Go/Java", "Kubernetes", "gRPC", "Distributed Systems"),
                "https://www.uber.com/careers/university/"),

            createInternship("Frontend Developer Intern", "PhonePe", "Bangalore, India", "3 Month Internship", "₹35,000/month",
                "Build seamless, performant mobile and web UIs for India's fastest-growing digital payments platform.",
                Arrays.asList("React/React Native", "JavaScript", "CSS", "Redux"),
                "https://www.phonepe.com/careers/"),

            createInternship("DevOps Intern", "Atlassian", "Bangalore, India", "Summer Internship", "₹60,000/month",
                "Automate CI/CD pipelines, manage cloud infrastructure, and improve reliability for products like Jira and Confluence.",
                Arrays.asList("Docker", "Kubernetes", "AWS/GCP", "CI/CD Pipelines"),
                "https://www.atlassian.com/company/careers/students"),

            createInternship("Cybersecurity Intern", "Palo Alto Networks", "Bangalore, India", "6 Month Internship", "₹50,000/month",
                "Work on next-generation firewall technology, threat detection, and cloud security solutions protecting global enterprises.",
                Arrays.asList("Network Security", "Python", "Linux", "Threat Analysis"),
                "https://jobs.paloaltonetworks.com/students"),

            createInternship("Open Source Contributor", "Google Summer of Code", "Remote", "3 Month Program", "Stipend Varies",
                "Contribute to open-source projects under mentorship from experienced developers worldwide. Build your portfolio and reputation.",
                Arrays.asList("Open Source", "Git", "Any Programming Language", "Communication"),
                "https://summerofcode.withgoogle.com/")
        );
        internshipRepository.saveAll(internships);
    }

    private Internship createInternship(String title, String company, String location, String type, String stipend,
                                         String description, List<String> requirements, String applyLink) {
        Internship i = new Internship();
        i.setTitle(title);
        i.setCompany(company);
        i.setLocation(location);
        i.setType(type);
        i.setStipend(stipend);
        i.setDescription(description);
        i.setRequirements(requirements);
        i.setApplyLink(applyLink);
        i.setPostedAt(new Date());
        return i;
    }

    private void seedNotes() {
        List<Note> notes = Arrays.asList(
            // Data Structures & Algorithms
            createNote("Arrays & Linked Lists", "Data Structures & Algorithms", "Comprehensive guide to array operations, linked list types (singly, doubly, circular), time complexity analysis."),
            createNote("Trees & Binary Search Trees", "Data Structures & Algorithms", "BST operations, AVL trees, Red-Black trees, tree traversals (inorder, preorder, postorder), and balanced tree concepts."),
            createNote("Graphs - BFS & DFS", "Data Structures & Algorithms", "Graph representations, BFS/DFS traversals, shortest path algorithms (Dijkstra, Bellman-Ford), topological sorting."),
            createNote("Dynamic Programming Patterns", "Data Structures & Algorithms", "Top-down vs bottom-up DP, common patterns: knapsack, LCS, LIS, matrix chain multiplication, memoization techniques."),
            createNote("Sorting & Searching Algorithms", "Data Structures & Algorithms", "Merge sort, quick sort, heap sort, binary search variants, time/space complexity comparison table."),

            // Operating Systems
            createNote("Process Management & Scheduling", "Operating Systems", "Process states, PCB, context switching, CPU scheduling algorithms: FCFS, SJF, Round Robin, Priority scheduling."),
            createNote("Memory Management & Virtual Memory", "Operating Systems", "Paging, segmentation, page replacement algorithms (FIFO, LRU, Optimal), TLB, demand paging, thrashing."),
            createNote("Deadlocks & Synchronization", "Operating Systems", "Deadlock conditions, prevention, avoidance (Banker's algorithm), detection. Semaphores, mutex, monitors, producer-consumer."),
            createNote("File Systems & I/O", "Operating Systems", "File allocation methods, directory structures, disk scheduling algorithms (SCAN, C-SCAN, SSTF), RAID levels."),

            // Database Management Systems
            createNote("ER Diagrams & Relational Model", "Database Management Systems", "Entity-Relationship modeling, mapping ER to relational schema, keys (primary, candidate, foreign), integrity constraints."),
            createNote("Normalization (1NF to BCNF)", "Database Management Systems", "Functional dependencies, normal forms (1NF, 2NF, 3NF, BCNF), decomposition, lossless join, dependency preservation."),
            createNote("SQL Queries & Joins", "Database Management Systems", "DDL, DML, aggregate functions, subqueries, different types of joins (INNER, LEFT, RIGHT, FULL), views, indexing."),
            createNote("Transactions & Concurrency", "Database Management Systems", "ACID properties, serializability, two-phase locking, timestamp ordering, deadlock in DBMS, recovery techniques."),

            // Computer Networks
            createNote("OSI & TCP/IP Model", "Computer Networks", "7-layer OSI model vs 4-layer TCP/IP, protocols at each layer, encapsulation, PDU types, comparison table."),
            createNote("TCP, UDP & Transport Layer", "Computer Networks", "TCP 3-way handshake, flow control, congestion control, sliding window, UDP characteristics, port numbers."),
            createNote("IP Addressing & Subnetting", "Computer Networks", "IPv4 classes, CIDR, subnet masks, subnetting practice problems, IPv6 basics, NAT, DHCP."),
            createNote("HTTP, DNS & Application Layer", "Computer Networks", "HTTP methods, status codes, cookies, DNS resolution, SMTP, FTP, REST APIs, WebSockets."),

            // Object-Oriented Programming
            createNote("OOP Principles & SOLID", "Object-Oriented Programming", "Encapsulation, inheritance, polymorphism, abstraction. SOLID principles with Java/C++ examples and UML diagrams."),
            createNote("Design Patterns", "Object-Oriented Programming", "Singleton, Factory, Observer, Strategy, Builder, Adapter patterns with real-world use cases and implementation."),

            // Software Engineering
            createNote("SDLC Models & Agile", "Software Engineering", "Waterfall, Spiral, V-model, Agile/Scrum methodology, sprints, user stories, kanban boards, CI/CD basics."),
            createNote("UML Diagrams & System Design", "Software Engineering", "Use case, class, sequence, activity diagrams. System design basics: load balancing, caching, database sharding."),

            // Theory of Computation
            createNote("Finite Automata & Regular Languages", "Theory of Computation", "DFA, NFA, NFA-to-DFA conversion, regular expressions, pumping lemma for regular languages, closure properties."),
            createNote("Context-Free Grammars & PDA", "Theory of Computation", "CFG, parse trees, ambiguity, CNF, GNF, pushdown automata, pumping lemma for CFLs."),
            createNote("Turing Machines & Decidability", "Theory of Computation", "Turing machine design, Church-Turing thesis, decidable vs undecidable problems, halting problem, reductions."),

            // Compiler Design
            createNote("Lexical & Syntax Analysis", "Compiler Design", "Lexer design, tokenization, regular expressions in lexing, top-down parsing (LL), bottom-up parsing (LR, SLR, LALR)."),

            // Machine Learning & AI
            createNote("Supervised & Unsupervised Learning", "Machine Learning & AI", "Linear regression, logistic regression, decision trees, SVM, k-means, hierarchical clustering, evaluation metrics."),
            createNote("Neural Networks & Deep Learning", "Machine Learning & AI", "Perceptron, backpropagation, CNNs, RNNs, LSTMs, transformers, activation functions, optimization algorithms.")
        );
        noteRepository.saveAll(notes);
    }

    private Note createNote(String title, String subject, String description) {
        Note n = new Note();
        n.setTitle(title);
        n.setSubject(subject);
        n.setFileUrl(null);  // No actual file, but description serves as content
        n.setUploadedBy("system");
        n.setUploadedAt(new Date());
        return n;
    }
}
