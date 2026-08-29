# dsh-modern-cpp

A [DeepSeek Harness](https://github.com/deepseek-ai/dsh) plugin that provides a comprehensive Modern C++ development guide. Enforces standard-first coding with C++11/14/17/20/23/26 features.

## What It Does

When loaded, this skill makes AI default to modern C++ idioms:

- **RAII** over manual resource management
- **Smart pointers** over raw `new`/`delete`
- **Concepts** over SFINAE
- **Ranges** over iterator boilerplate
- **`std::expected`** over error codes
- **`std::format`** over iostream/printf
- And many more...

## Features Covered

| Standard | Key Features |
|---|---|
| C++11 | `auto`, `nullptr`, move semantics, smart pointers, lambdas, `constexpr` |
| C++14 | Generic lambdas, `make_unique`, relaxed `constexpr` |
| C++17 | `optional`, `variant`, `string_view`, structured bindings, `if constexpr` |
| C++20 | Concepts, ranges, coroutines, modules, `std::format`, three-way comparison |
| C++23 | `std::expected`, `std::print`, `flat_map`, `mdspan`, deducing `this` |
| C++26 | Contracts, reflection, `std::sender`, pattern matching, `std::hive` |

## Installation

```bash
# Via DSH plugin command (recommended)
dsh plugin --profile web add github:your-username/dsh-modern-cpp

# Or manually clone into your profile
cd ~/.dsh/profiles/web
git clone https://github.com/your-username/dsh-modern-cpp.git node_modules/dsh-modern-cpp
```

Then add `dsh-modern-cpp` to your `dsh.profile.bundles` in `package.json`:

```json
{
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "dsh-modern-cpp"
      ]
    }
  }
}
```

## Usage

Once installed, the `modern-cpp` skill is automatically available. Use it when:

- Writing new C++ code
- Reviewing existing code
- Refactoring legacy C++ to modern standards
- Explaining C++ features

The skill will guide the AI to:
1. Always suggest the most modern standard available
2. Use standard library facilities before third-party libraries
3. Apply RAII, smart pointers, and move semantics by default
4. Use concepts to constrain templates
5. Prefer ranges over manual iterator loops

## Skill Content

The skill includes:

- **Core Philosophy** — Zero-overhead abstraction, standard-first, pay for what you use
- **Feature Reference** — Quick lookup table for C++11 through C++26
- **10 Coding Rules** — Concrete examples of modern vs legacy patterns
- **Decision Tree** — When to use which feature
- **Standard Library Checklist** — What's available in the standard before reaching for third-party libs

## References

- [cppreference.com](https://cppreference.com)
- [AnthonyCalandra/modern-cpp-features](https://github.com/AnthonyCalandra/modern-cpp-features)
- [13eholder/Modern-Cpp-Skills](https://github.com/13eholder/Modern-Cpp-Skills)
- [parasxos/cpp26-adapter](https://github.com/parasxos/cpp26-adapter)

## License

MIT
