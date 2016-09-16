function LinkedList() {

    var listSize = 0;
    var headNode = null;

    var Node = function(element1, element2){
        this.element1 = element1;
        this.element2 = element2;
        this.next = null;
    };

    var headNode = function () {
        this.first = null;
        this.last = null;
    }

    headNode = new headNode();


    this.add = add;
    this.toString = toString;
    this.headNode = headNode;
    this.remove = remove;
    this.indexOf = indexOf;
    this.getSize = getSize;
    this.getNodeFromElements = getNodeFromElements;
    this.getNodeFromIndex = getNodeFromIndex;

    // this.insert = insert;
    // this.removeFrom = removeFrom;
    // this.hasElements = hasElements;
    // this.size = size;
    // this.headNode = headNode;
    function getSize() {
      return listSize;
    }

    function add(element1, element2) {
        var node = new Node(element1, element2);
        var currentNode;
        if (!hasElements()) {
            headNode.first = node;
            headNode.last = node;
        } else {
            currentNode = headNode.last;
            currentNode.next = node;
            headNode.last = node;
         }
        listSize++;
    }



    function remove(element1, element2) {
        var nodeElements = getNodeFromElements(element1, element2);
        if (nodeElements == null) {
          return null;
        }
        if (headNode.first == nodeElements) {
            headNode.first = nodeElements.next;
            return nodeElements;
        }

        currentNode = headNode.first;

        while (currentNode.next != nodeElements) {
            currentNode = currentNode.next;
        }

        currentNode.next = nodeElements.next;

        if (headNode.last == nodeElements) {
            currentNode.next = null;
            headNode.last = currentNode;
        }

        return nodeElements;
    }

    // function removeFromIndex(index) {
    //
    //     if (index < 0 || index>listSize-1) {
    //         return -1;
    //     }
    //
    //     currentNode = headNode.first;
    //
    //     if (index == 0) {
    //         headNode.first = currentNode.next;
    //         return currentNode;
    //     }
    //     // getElement(index);
    //     while (currentNode.next != 1) {
    //         currentNode = currentNode.next;
    //     }
    //
    //     if (index == listSize-1) {
    //         headNode.last = currentNode;
    //     }
    //
    //     [1,5,3]
    //
    //
    // }

    function getNodeFromIndex(index) {
        if (index == -1 || index > listSize) {
          return null;
        }
        currentNode = headNode.first;
        for (var i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }
        return currentNode;

    }

    function getNodeFromElements(element1, element2) {
        currentNode = headNode.first;
        var counter = 0;
        while(currentNode.element1 != element1 || currentNode.element2 != element2){
            if (counter >= listSize) return null;
            currentNode = currentNode.next;
            counter++;
        }

        return currentNode;
    }



    function toString() {
        var currentNode = headNode.first;
        var str = '[';

        while (currentNode) {
            str += currentNode.element1 + ',' + currentNode.element2 + ';';
            currentNode = currentNode.next;
        }
        str = str.substring(0,str.length-1);
        str+=']'

        return str;
    }

    function hasElements() {
        return listSize>0;
    }

    function indexOf(element1,element2) {
        var currentNode = headNode.first;
        var index = 0;

        while (currentNode) {
            if (currentNode.element1 === element1 && currentNode.element2 === element2) {
                return index;
            }

            index++;
            currentNode = currentNode.next;
        }

        return -1;
    }

}

//     function insert(element, pos) {
//         // Verificamos que la posición exista
//         if (pos > -1 && pos < listSize) {
//             var node = new Node(element);
//             var currentNode = headNode;
//             var previousNode;
//             var index = 0;
//             var auxHeadNode = headNode;
//             // Primer elemento
//             if (pos === 0) {
//                 node.next = currentNode;
//                 headNode = node;
//                 headNode.last = auxHeadNode.last;
//             } else {
//                 while (index++ < pos) {
//                     previousNode = currentNode;
//                     currentNode = currentNode.next;
//                 }

//                 if (pos==listSize-1) {
//                     headNode.last = currentNode;
//                 }

//                 node.next = currentNode;
//                 previousNode.next = node;
//             }

//             listSize++;

//             return true;
//         }

//         return false;
//     }


//     function removeFrom(pos) {

//         // Verificamos que la posición exista
//         if (pos > -1 && pos < listSize) {
//             var currentNode = headNode;
//             var previousNode;
//             var index = 0;
//             var auxHeadNode = headNode;

//             // Si pos 0, entonces eliminaremos el primer elemento.
//             if (pos === 0) {
//                 headNode = currentNode.next;
//                 headNode.last = auxHeadNode.last;
//             } else {
//                 while (index++ < pos) {
//                     // Mandamos el nodo actual a previous
//                     previousNode = currentNode;

//                     // Ahora el actual será el next
//                     currentNode = currentNode.next;
//                 }
//                 console.log(listSize);
//                 console.log(pos);
//                 console.log('=========');
//                 if (pos==listSize) {
//                     headNode.last = currentNode;
//                 }

//                 // Enlazamos el next de previous con el next del nodo actual (lo saltamos para eliminarlo)
//                 previousNode.next = currentNode.next;
//             }

//             // Restamos el elemento eliminado de la lista
//             listSize--;

//             // Retornamos el valor del elemento eliminado
//             return currentNode.element;
//         }

//         // Si la posición esta fuera de rangos regresamos null
//         return null;
//     }

//     function indexOf(element) {
//         var currentNode = headNode;
//         var index = 0;

//         while (currentNode) {
//             if (currentNode.element === element) {
//                 return index;
//             }

//             index++;
//             currentNode = currentNode.next;
//         }

//         return -1;
//     }

// }

 module.exports =(LinkedList);
//var linkedList = new LinkedList();
