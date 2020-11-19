var documenterSearchIndex = {"docs":
[{"location":"api/#API-1","page":"API","title":"API","text":"","category":"section"},{"location":"api/#","page":"API","title":"API","text":"AnnotationNode\nAbstractTrees.ImplicitParents\nAbstractTrees.ImplicitSiblings\nLeaves\nAbstractTrees.ParentLinks\nPostOrderDFS\nPreOrderDFS\nShadowTree\nAbstractTrees.SiblingLinks\nStatelessBFS\nAbstractTrees.StoredParents\nAbstractTrees.StoredSiblings\nTree\nTreeCharSet\nTreeIterator\nchildren\nAbstractTrees.nodetype\nAbstractTrees.parentlinks\nprint_tree\nAbstractTrees.printnode\nAbstractTrees.siblinglinks\ntreemap\ntreemap!","category":"page"},{"location":"api/#AbstractTrees.Leaves","page":"API","title":"AbstractTrees.Leaves","text":"Iterator to visit the leaves of a tree, e.g. for the tree\n\nAny[1,Any[2,3]]\n├─ 1\n└─ Any[2,3]\n   ├─ 2\n   └─ 3\n\nwe will get [1,2,3].\n\n\n\n\n\n","category":"type"},{"location":"api/#AbstractTrees.PostOrderDFS","page":"API","title":"AbstractTrees.PostOrderDFS","text":"Iterator to visit the nodes of a tree, guaranteeing that children will be visited before their parents.\n\ne.g. for the tree\n\nAny[1,Any[2,3]]\n├─ 1\n└─ Any[2,3]\n   ├─ 2\n   └─ 3\n\nwe will get [1, 2, 3, [2, 3], [1, [2, 3]]].\n\n\n\n\n\n","category":"type"},{"location":"api/#AbstractTrees.PreOrderDFS","page":"API","title":"AbstractTrees.PreOrderDFS","text":"Iterator to visit the nodes of a tree, guaranteeing that parents will be visited before their children.\n\nOptionally takes a filter function that determines whether the iterator should continue iterating over a node's children (if it has any) or should consider that node a leaf.\n\ne.g. for the tree\n\nAny[Any[1,2],Any[3,4]]\n├─ Any[1,2]\n|  ├─ 1\n|  └─ 2\n└─ Any[3,4]\n   ├─ 3\n   └─ 4\n\nwe will get [[[1, 2], [3, 4]], [1, 2], 1, 2, [3, 4], 3, 4].\n\nInvalidation\n\nModifying the underlying tree while iterating over it, is allowed, however, if parents and sibling links are not explicitly stored, the identity of any parent of the last obtained node does not change (i.e. mutation is allowed, replacing nodes is not).\n\n\n\n\n\n","category":"type"},{"location":"api/#AbstractTrees.StatelessBFS","page":"API","title":"AbstractTrees.StatelessBFS","text":"Iterator to visit the nodes of a tree, all nodes of a level will be visited before their children\n\ne.g. for the tree\n\nAny[1,Any[2,3]]\n├─ 1\n└─ Any[2,3]\n   ├─ 2\n   └─ 3\n\nwe will get [[1, [2,3]], 1, [2, 3], 2, 3].\n\nWARNING: This is O(n^2), only use this if you know you need it, as opposed to a more standard statefull approach.\n\n\n\n\n\n","category":"type"},{"location":"api/#AbstractTrees.StoredParents","page":"API","title":"AbstractTrees.StoredParents","text":"Indicates that this tree stores parent links explicitly. The implementation   is responsible for defining the parentind function to expose this   information.\n\n\n\n\n\n","category":"type"},{"location":"api/#AbstractTrees.StoredSiblings","page":"API","title":"AbstractTrees.StoredSiblings","text":"Indicates that this tree stores sibling links explicitly, or can compute them   quickly (e.g. because the tree has a (small) fixed branching ratio, so the   current index of a node can be determined by quick linear search). The   implementation is responsible for defining the relative_state function   to expose this information.\n\n\n\n\n\n","category":"type"},{"location":"api/#AbstractTrees.children","page":"API","title":"AbstractTrees.children","text":"children(x)\n\nReturn the immediate children of node x. You should specialize this method for custom tree structures. It should return an iterable object for which an appropriate implementation of Base.pairs is available.\n\nThe default behavior is to assume that if an object is iterable, iterating over it gives its children. If an object is not iterable, assume it does not have children.\n\nExample\n\nstruct MyNode{T}\n    data::T\n    children::Vector{MyNode{T}}\nend\nAbstractTrees.children(node::MyNode) = node.children\n\n\n\n\n\n","category":"function"},{"location":"api/#AbstractTrees.nodetype","page":"API","title":"AbstractTrees.nodetype","text":"nodetype(tree)\n\nA trait function, defined on the tree object, specifying the types of the nodes. The default is Any. When applicable, define this trait to make iteration inferrable.\n\nExample\n\nstruct IntTree\n    num::Int\n    children::Vector{IntTree}\nend\nAbstractTrees.children(itree::IntTree) = itree.children\nAbstractTrees.nodetype(::IntTree) = IntTree\n\nThis suffices to make iteration over, e.g., Leaves(itree::IntTree) inferrable.\n\n\n\n\n\n","category":"function"},{"location":"api/#AbstractTrees.print_tree","page":"API","title":"AbstractTrees.print_tree","text":"print_tree(tree; kwargs...)\nprint_tree(io::IO, tree; kwargs...)\nprint_tree(f::Function, io::IO, tree; kwargs...)\n\nUsage\n\nPrints an ASCII formatted representation of the tree to the given io object. By default all children will be printed up to a maximum level of 5, though this value can be overriden by the maxdepth parameter. Nodes that are truncated are indicated by a vertical ellipsis below the truncated node, this indication can be turned off by providing indicate_truncation=false as a kwarg. The charset to use in printing can be customized using the charset keyword argument. You can control the printing of individual nodes by passing a function f(io, node); the default is AbstractTrees.printnode.\n\nExamples\n\njulia> print_tree(stdout, Dict(\"a\"=>\"b\",\"b\"=>['c','d']))\nDict{String,Any}(\"b\"=>['c','d'],\"a\"=>\"b\")\n├─ b\n│  ├─ c\n│  └─ d\n└─ a\n   └─ b\n\njulia> print_tree(stdout, '0'=>'1'=>'2'=>'3', 2)\n'0'\n└─ '1'\n    └─ '2'\n        ⋮\n\njulia> print_tree(stdout, Dict(\"a\"=>\"b\",\"b\"=>['c','d']);\n        charset = TreeCharSet('+','\\\\','|',\"--\",\"⋮\"))\nDict{String,Any}(\"b\"=>['c','d'],\"a\"=>\"b\")\n+-- b\n|   +-- c\n|   \\-- d\n\\-- a\n   \\-- b\n\n\n\n\n\n","category":"function"},{"location":"api/#AbstractTrees.printnode","page":"API","title":"AbstractTrees.printnode","text":"printnode(io::IO, node)\n\nPrint a single node. The default is to show a compact representation of node. Override this if you want nodes printed in a custom way in print_tree, or if you want your print function to print part of the tree by default.\n\nExample\n\nstruct MyNode{T}\n    data::T\n    children::Vector{MyNode{T}}\nend\nAbstractTrees.printnode(io::IO, node::MyNode) = print(io, \"MyNode($(node.data))\")\n\n\n\n\n\n","category":"function"},{"location":"#AbstractTrees.jl-1","page":"AbstractTrees.jl","title":"AbstractTrees.jl","text":"","category":"section"},{"location":"#","page":"AbstractTrees.jl","title":"AbstractTrees.jl","text":"This package provides several utilities for working with tree-like data structures. Most importantly, it defines the children method that any package that contains such a data structure may import and extend in order to take advantage of any generic tree algorithm in this package (or other packages compatible with this package).","category":"page"},{"location":"#API-overview-1","page":"AbstractTrees.jl","title":"API overview","text":"","category":"section"},{"location":"#","page":"AbstractTrees.jl","title":"AbstractTrees.jl","text":"print_tree pretty prints an arbitrary tree data structure.\nTree is a simple wrapper around an arbitrary object that allows tree-indexing into that object (i.e. indexing with collections of indices specifying the child index at every level).\nShadowTree is a tree object that combines two trees of equal structure into a single tree (indexing always produces another ShadowTree, but setindex! with tuples is allowed). Useful for adding annotation nodes to other trees without modifying that tree structure itself.\nLeaves is an iterator to visit the leaves of a tree in order.\nPostOrderDFS is a depth-first search (i.e. will visit node's children before it's lexicographically following siblings) that guarantees to visit children before their parents.\nPreOrderDFS is same as PostOrderDFS but visits parents before their children.\nStatelessBFS iterates over a tree level-by-level, but does not keep state (causing this to be O(n^2), but able to handle changing trees).\ntreemap maps each node of a tree to obtain a new tree.\ntreemap! maps each node of a tree in place.","category":"page"},{"location":"#Traits-1","page":"AbstractTrees.jl","title":"Traits","text":"","category":"section"},{"location":"#","page":"AbstractTrees.jl","title":"AbstractTrees.jl","text":"AbstractTrees.nodetype(tree) can be defined to make iteration inferable.\nAbstractTrees.ParentLinks can be defined to return AbstractTrees.StoredParents() if a tree type stores explicit links to a parent; AbstractTrees.SiblingLinks, when set to AbstractTrees.StoredSiblings(), serves the same role for siblings. See their docstrings for more information.","category":"page"},{"location":"#Examples-1","page":"AbstractTrees.jl","title":"Examples","text":"","category":"section"},{"location":"#","page":"AbstractTrees.jl","title":"AbstractTrees.jl","text":"The examples folder contains a number of usage examples of varying complexity.  ","category":"page"}]
}
