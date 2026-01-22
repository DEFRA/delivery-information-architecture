/**
 * Remark plugin to filter conditional content blocks for Astro/GitHub Pages
 * Removes PPT_ONLY and CONFLUENCE_ONLY blocks, keeps GITHUB_ONLY content
 */

import { visit } from 'unist-util-visit';

export function remarkFilterConditional() {
  return (tree) => {
    // Track nodes to remove
    const nodesToRemove = [];
    let inPptOnly = false;
    let inConfluenceOnly = false;

    visit(tree, (node, index, parent) => {
      if (node.type === 'html') {
        const value = node.value.trim();
        
        // Check for opening tags
        if (value.match(/^<!--\s*PPT_ONLY\s*-->$/)) {
          inPptOnly = true;
          nodesToRemove.push({ parent, index });
          return;
        }
        if (value.match(/^<!--\s*CONFLUENCE_ONLY\s*-->$/)) {
          inConfluenceOnly = true;
          nodesToRemove.push({ parent, index });
          return;
        }
        
        // Check for closing tags
        if (value.match(/^<!--\s*\/PPT_ONLY\s*-->$/)) {
          inPptOnly = false;
          nodesToRemove.push({ parent, index });
          return;
        }
        if (value.match(/^<!--\s*\/CONFLUENCE_ONLY\s*-->$/)) {
          inConfluenceOnly = false;
          nodesToRemove.push({ parent, index });
          return;
        }
        
        // Remove GITHUB_ONLY comment tags but keep what's inside
        if (value.match(/^<!--\s*GITHUB_ONLY\s*-->$/) || value.match(/^<!--\s*\/GITHUB_ONLY\s*-->$/)) {
          nodesToRemove.push({ parent, index });
          return;
        }
      }
      
      // Mark nodes inside PPT_ONLY or CONFLUENCE_ONLY for removal
      if ((inPptOnly || inConfluenceOnly) && parent) {
        nodesToRemove.push({ parent, index });
      }
    });

    // Remove marked nodes (in reverse order to preserve indices)
    const removeByParent = new Map();
    for (const { parent, index } of nodesToRemove) {
      if (!removeByParent.has(parent)) {
        removeByParent.set(parent, []);
      }
      removeByParent.get(parent).push(index);
    }

    for (const [parent, indices] of removeByParent) {
      // Sort in reverse order and remove
      indices.sort((a, b) => b - a);
      for (const index of indices) {
        if (parent.children && index < parent.children.length) {
          parent.children.splice(index, 1);
        }
      }
    }
  };
}

export default remarkFilterConditional;
