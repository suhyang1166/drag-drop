const fileUpload = document.querySelector("#input");
const fileDrag = document.querySelector(".label");

// 파일 입력 변경 이벤트 리스너
fileUpload.addEventListener("change", (e) => {
  const files = changeEvent(e);
  handleUpdate(files);
});

// 드래그 앤 드롭 효과를 위한 이벤트 리스너
fileDrag.addEventListener("mouseover", (e) => {
  e.preventDefault();
  fileDrag.classList.add("label--hover");
});

fileDrag.addEventListener("mouseout", (e) => {
  e.preventDefault();
  fileDrag.classList.remove("label--hover");
});

// dragover 이벤트의 기본 동작을 방지
document.addEventListener("dragover", (e) => {
  e.preventDefault();
});
document.addEventListener("dragenter", (e) => {
  e.preventDefault();
});
document.addEventListener("dragleave", (e) => {
  e.preventDefault();
});

// 파일 드롭을 처리
document.addEventListener("drop", (event) => {
  event.preventDefault();
  console.log("drop");
  if (event.target.classList.contains("file-wrap")) {
    const files = event.dataTransfer?.files;
    if (files) {
      handleUpdate([...files]);
    }
  }
});

// change 이벤트를 처리하는 도우미 함수
const changeEvent = (e) => {
  const { target } = e;
  return [...target.files];
};

// 파일 미리보기를 업데이트하는 함수
const handleUpdate = (fileList) => {
  const preview = document.querySelector(".imgs-container");
  fileList.forEach((file) => {
    const reader = new FileReader();
    reader.addEventListener("load", (e) => {
      const img = createNode("img", {
        className: "embed-img",
        src: e.target?.result,
      });
      const imgContainer = createNode(
        "div",
        {
          className: "container-img",
        },
        img
      );
      preview.append(imgContainer);
    });
    reader.readAsDataURL(file);
  });
};

// 속성과 자식 노드를 가진 새로운 DOM 노드를 생성하는 도우미 함수
const createNode = (nodeName, att, ...children) => {
  const node =
    nodeName === "fragment"
      ? document.createDocumentFragment()
      : document.createElement(nodeName);

  Object.entries(att).forEach(([key, value]) => {
    if (key === "events") {
      Object.entries(value).forEach(([type, handler]) => {
        node.addEventListener(type, handler);
      });
    } else if (key in node) {
      try {
        node[key] = value;
      } catch (err) {
        node.setAttribute(key, value);
      }
    } else {
      node.setAttribute(key, value);
    }
  });

  children.forEach((childNode) => {
    if (typeof childNode === "string") {
      node.appendChild(document.createTextNode(childNode));
    } else {
      node.appendChild(childNode);
    }
  });

  return node;
};
