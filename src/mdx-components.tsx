import type { MDXComponents } from "mdx/types";
import { mdxComponents } from "@/components/mdx";

// Required by @next/mdx: makes the case-study components available in every .mdx file.
export function useMDXComponents(): MDXComponents {
  return mdxComponents;
}
