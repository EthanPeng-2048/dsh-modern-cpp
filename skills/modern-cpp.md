---
name: modern-cpp
description: Modern C++ development guide (C++11/14/17/20/23/26). Enforces standard-first coding, RAII ownership, move semantics, constexpr metaprogramming, concepts, and the latest language features. Use this Skill when writing, reviewing, refactoring, or explaining C++ code to ensure AI defaults to modern idioms over legacy patterns.
whenToUse: C++ code writing, reviewing, refactoring, or explanation tasks
---

# Modern C++ Development Guide

You are a C++ expert who defaults to the **latest applicable standard** (C++23/26 when available, C++20 as baseline, C++17 as fallback). Every suggestion must be standard-first: use the ISO standard feature before reaching for third-party libraries or legacy patterns.

## Core Philosophy

1. **Zero-overhead abstraction** — Prefer compile-time computation, type-safe abstractions, and RAII over manual resource management.
2. **Standard-first** — Before suggesting Boost, fmt, or any third-party lib, check whether the standard library already provides the facility.
3. **Pay for what you use** — Modern C++ features have zero runtime cost when unused. Don't avoid features for "performance" without measurement.
4. **Express intent** — Use the language to express *what* the code does, not *how* it does it.
5. **Lifetime safety** — Ownership and lifetime must be expressible and verifiable at compile time.

## Quick Feature Reference by Standard

### C++11 — The Foundation

| Feature | Use Instead Of | Example |
|---|---|---|
| `auto` | Explicit type when obvious | `auto x = std::make_unique<Foo>();` |
| `nullptr` | `NULL`, `0` | `if (ptr != nullptr)` |
| Range-for | Iterator loops | `for (const auto& item : container)` |
| `override` / `final` | Comment-based documentation | `void draw() override;` |
| Uniform init `{}` | `()` or `=` for safety | `int x{42};` |
| `enum class` | Unscoped enums | `enum class Color { Red, Blue };` |
| `constexpr` | `#define` macros for constants | `constexpr int max_size = 1024;` |
| Move semantics | Deep-copy everything | `std::string s = std::move(other);` |
| Smart pointers | Raw `new`/`delete` | `auto p = std::make_shared<T>();` |
| Lambdas | `std::bind`, functors | `auto f = [](int x) { return x * 2; };` |
| `std::thread` | Platform threads | `std::thread t([]{ work(); });` |
| `std::atomic` | Volatile for flags | `std::atomic<bool> ready{false};` |
| `using` aliases | `typedef` | `using Vec = std::vector<int>;` |
| `noexcept` | Empty `throw()` | `void swap(T& other) noexcept;` |
| Braced init list | Constructor calls | `std::vector<int> v{1, 2, 3};` |

### C++14 — Refinements

| Feature | Use Instead Of |
|---|---|
| `auto` return type | Explicit return type when deducible |
| Generic lambdas | Writing overloads for each type | `[](auto&& x) { ... }` |
| `std::make_unique` | Manual `new` + unique_ptr |
| `std::index_sequence` | Recursive template metaprogramming |
| `constexpr` relaxed | Functions with loops/ifs in constexpr |
| `std::exchange` | Manual temp-variable swaps |
| Binary literals | Hex masks `0xFF` | `0b1010'1100` |
| Digit separators | Readable large numbers | `1'000'000` |

### C++17 — The Productivity Leap

| Feature | Use Instead Of |
|---|---|
| `std::optional` | Sentinel values, raw pointers for optionality |
| `std::variant` | Unions, `void*`, type-unsafe tagged unions |
| `std::any` | `void*` with manual type tracking |
| `std::string_view` | `const std::string&` for read-only parameters |
| Structured bindings | `.first`/`.second`, named getters | `auto [key, value] = *map.begin();` |
| `if constexpr` | SFINAE, tag dispatch for compile-time branching |
| `std::filesystem` | Platform-specific path/file APIs |
| Fold expressions | Recursive template expansion | `(... + args)` |
| `std::invoke` | Manual functor dispatch |
| Nested namespaces | `namespace a::b::c { }` |
| Class template arg deduction | `std::pair p{1, 2.0};` |
| `[[nodiscard]]` | Ignoring return values silently |
| `[[maybe_unused]]` | Unused variable warnings |
| `[[fallthrough]]` | Missing break comments |
| `std::byte` | Raw `char*` for byte buffers |
| Parallel algorithms | Manual thread pools | `std::execution::par` |

### C++20 — The Transformation

| Feature | Use Instead Of |
|---|---|
| **Concepts** | `enable_if`, SFINAE, `static_assert` with messages |
| **Ranges** | Iterator boilerplate, range-for + filter | `views::filter`, `views::transform` |
| **Coroutines** | Callback chains, state machines | `co_await`, `co_return`, `co_yield` |
| **Modules** | Header files, `#include` guards, PCH |
| **`constexpr` virtual** | Runtime-only polymorphism in constant contexts |
| **`std::format`** | `printf`, `iostream` formatting | `std::format("Hello {}!", name)` |
| **Three-way comparison** | Writing `operator<`, `operator==`, etc. | `operator<=>` |
| **`consteval`** | `constexpr` that must run at compile time |
| **`constinit`** | Static initialization order fiasco |
| **`std::span`** | `(pointer, size)` pairs | `void fn(std::span<int> data)` |
| **`[[likely]]`/`[[unlikely]]`** | Branch prediction hints |
| Designated initializers | Named constructor params | `T{.x=1, .y=2}` |
| Lambda in unevaluated contexts | Type traits workarounds |
| `std::jthread` | Manual thread + join + stop_token |
| Ranges views | Lazy pipeline composition |

### C++23 — Polishing

| Feature | Use Instead Of |
|---|---|
| `std::expected` | `std::optional` + error codes, exceptions for Expected |
| `std::print` / `std::println` | `std::cout`, `printf` |
| `std::flat_map` | Sorted vector of pairs for lookup |
| `std::mdspan` | Manual multi-dimensional indexing |
| `std::generator` | Custom coroutine return types |
| `std::stacktrace` | Platform-specific stack trace APIs |
| `if consteval` | `if constexpr` in constexpr contexts |
| `std::ranges::to` | Manual range-to-container conversion |
| Deducing `this` | CRTP, explicit object parameters |
| `std::move_only_function` | `std::function` that can't copy |
| `std::zip` | Parallel iteration over multiple ranges |

### C++26 — The Frontier

| Feature | Use Instead Of |
|---|---|
| **Contracts** | `assert()`, manual precondition/postcondition checks |
| **Reflection** | `typeid`, manual type introspection, X-macros |
| **`std::sender`/`std::receiver`** | Manual async composition, callback-based async |
| **`std::hive`** | `std::vector` + erase-remove for stable pointers |
| **`std::async` revamp** | `std::thread` + `std::future` composition |
| **Pattern matching** | Chain of `if-else`/`switch` on types |
| `static_assert(rule)` | Concept constraints with better errors |
| **Hazard pointers** | Manual lock-free memory reclamation |
| **`std::execution`** | Thread pools, manual task scheduling |

## Coding Rules — Always Prefer Modern Idioms

### Rule 1: RAII Everything
```cpp
// ❌ Bad: Manual resource management
void process() {
    FILE* f = fopen("data.txt", "r");
    // ... may throw before fclose
    fclose(f);
}

// ✅ Good: RAII
void process() {
    auto f = std::unique_ptr<FILE, decltype(&fclose)>(
        fopen("data.txt", "r"), fclose);
    // ... exception-safe
}

// ✅ Better: Standard library
void process() {
    std::ifstream file("data.txt");
    // ... RAII by default
}
```

### Rule 2: Use Smart Pointers, Not Raw new/delete
```cpp
// ❌ Bad
Widget* w = new Widget();
// ... may leak
delete w;

// ✅ Good
auto w = std::make_unique<Widget>();
auto shared_w = std::make_shared<Widget>();  // when shared ownership needed
```

### Rule 3: Move Semantics by Default
```cpp
// ❌ Bad: Unnecessary copies
std::vector<int> make_data() {
    std::vector<int> result = {1, 2, 3};
    return result;  // may copy without RVO
}

// ✅ Good: Explicit move when RVO can't apply
std::vector<int> make_data() {
    std::vector<int> result = {1, 2, 3};
    return result;  // NRVO applies, but move is fallback
}

// ✅ Good: Move into parameters
void accept(std::vector<int> data);  // caller can std::move
```

### Rule 4: constexpr Everything Possible
```cpp
// ❌ Bad: Runtime computation that could be compile-time
int factorial(int n) { return n <= 1 ? 1 : n * factorial(n-1); }

// ✅ Good: constexpr (works at both compile and runtime)
constexpr int factorial(int n) { return n <= 1 ? 1 : n * factorial(n-1); }

// ✅ Good: consteval for compile-time only
consteval int compile_time_factorial(int n) { ... }
```

### Rule 5: Concepts Over SFINAE
```cpp
// ❌ Bad: Unreadable SFINAE
template<typename T,
         typename = std::enable_if_t<std::is_arithmetic_v<T>>>
T add(T a, T b) { return a + b; }

// ✅ Good: Concepts
template<std::integral T>
T add(T a, T b) { return a + b; }

// ✅ Good: Constrained auto
auto add(std::integral auto a, std::integral auto b) { return a + b; }
```

### Rule 6: Ranges Over Iterator Boilerplate
```cpp
// ❌ Bad: Verbose iterator pattern
std::vector<int> result;
for (auto it = data.begin(); it != data.end(); ++it) {
    if (*it > 0) result.push_back(*it * 2);
}

// ✅ Good: Ranges pipeline
auto result = data
    | std::views::filter([](int x) { return x > 0; })
    | std::views::transform([](int x) { return x * 2; })
    | std::ranges::to<std::vector>();  // C++23
```

### Rule 7: structured bindings Over .first/.second
```cpp
// ❌ Bad
for (const auto& pair : map) {
    process(pair.first, pair.second);
}

// ✅ Good
for (const auto& [key, value] : map) {
    process(key, value);
}
```

### Rule 8: std::expected for Error Handling (C++23)
```cpp
// ❌ Bad: Error codes
Error process(Data& out);

// ❌ Meh: Exceptions (use when truly exceptional)
void process(Data& out);  // throws on error

// ✅ Good: Expected (explicit, composable)
std::expected<Data, Error> process();
```

### Rule 9: Designated Initializers for Clarity
```cpp
// ❌ Bad
Config cfg;
cfg.host = "localhost";
cfg.port = 8080;
cfg.timeout = 30;

// ✅ Good
Config cfg{.host = "localhost", .port = 8080, .timeout = 30};
```

### Rule 10: std::format Over iostream/printf
```cpp
// ❌ Bad
std::cout << "Name: " << name << ", Age: " << age << "\n";
printf("Name: %s, Age: %d\n", name.c_str(), age);

// ✅ Good
std::println("Name: {}, Age: {}", name, age);  // C++23
```

## When To Use What — Decision Tree

```
Need to store a value that might not exist?
  → std::optional (C++17)

Need to store one of several types?
  → std::variant (C++17)

Need to return success OR failure with error info?
  → std::expected (C++23)

Need to process a range with lazy transformations?
  → std::ranges + views (C++20)

Need compile-time type constraints?
  → Concepts (C++20)

Need async composition?
  → Coroutines (C++20) or std::sender (C++26)

Need reflection/introspection?
  → Reflection (C++26)

Need contract checking?
  → Contracts (C++26)

Need a multi-dimensional array view?
  → std::mdspan (C++23)

Need a stable-insert container with pointer stability?
  → std::hive (C++26)
```

## Standard Library First Checklist

Before suggesting any third-party library, verify the standard doesn't provide it:

| Need | Standard Facility | Header |
|---|---|---|
| String formatting | `std::format`, `std::println` | `<format>`, `<print>` |
| Filesystem ops | `std::filesystem` | `<filesystem>` |
| Date/time | `std::chrono` | `<chrono>` |
| JSON | Not in standard yet (use nlohmann/json) | — |
| HTTP | Not in standard yet (use cpp-httplib) | — |
| Math constants | `std::numbers::pi` etc. | `<numbers>` |
| Random | `std::mt19937`, `std::uniform_int_distribution` | `<random>` |
| Regular expressions | `std::regex` | `<regex>` |
| Smart pointers | `unique_ptr`, `shared_ptr`, `weak_ptr` | `<memory>` |
| Containers | `vector`, `unordered_map`, `flat_map`(C++23) | `<vector>`, etc. |
| Algorithms | `std::ranges::` algorithms | `<algorithm>`, `<ranges>` |
| Bit manipulation | `std::bit_cast`, `std::popcount` | `<bit>` |
| Span | `std::span` | `<span>` |
| Expected | `std::expected` | `<expected>` |
| Print | `std::print`, `std::println` | `<print>` |

## References

- [cppreference.com](https://cppreference.com) — Definitive standard library reference
- [AnthonyCalandra/modern-cpp-features](https://github.com/AnthonyCalandra/modern-cpp-features) — Comprehensive C++11/14/17/20 cheatsheet
- [13eholder/Modern-Cpp-Skills](https://github.com/13eholder/Modern-Cpp-Skills) — C++ skill framework covering ownership, lifecycle, concurrency, error handling
- [parasxos/cpp26-adapter](https://github.com/parasxos/cpp26-adapter) — C++26 specialist adapter with standard-first philosophy

## Behavior When This Skill Is Active

1. **Always suggest the most modern standard** the target compiler supports. When uncertain, ask or assume C++20 as minimum.
2. **Never suggest raw `new`/`delete`** — always smart pointers or RAII wrappers.
3. **Never suggest `NULL` or `0` for pointers** — always `nullptr`.
4. **Never suggest C-style casts** — use `static_cast`, `dynamic_cast`, etc.
5. **Always use `auto` when the type is obvious** from context (iterators, smart pointers, factory functions).
6. **Prefer `constexpr`/`consteval`/`constinit`** for anything computable at compile time.
7. **Use concepts to constrain templates** — never leave unconstrained templates.
8. **Use `std::format`/`std::println`** over iostream or printf.
9. **Use ranges and views** over manual iterator loops.
10. **Use structured bindings** over `.first`/`.second`.
11. **Use `std::expected`** for error handling over error codes or exceptions (for expected failures).
12. **Use designated initializers** for struct construction.
13. **Use `[[nodiscard]]`, `[[maybe_unused]]`, `[[fallthrough]]`** annotations.
14. **Use `enum class`** over plain enums.
15. **Use modules** over headers when the build system supports it.
