const inputArea = document.getElementById("text-list");
const addBtn = document.querySelector(".add-btn");
const listBoard = document.querySelector(".list");

addBtn.addEventListener("click", function () {
  const inputText = inputArea.value.trim();

  if ((inputText === "")) {
    // 사용자가 어떤 내용도 적지 않고, 추가하기 버튼 눌렀을 때
    alert("해야 할 일을 입력해주세요.");
    // 그리고 아무 추가적인 동작도 하지 않도록 리턴해주기
    return;
  }

  //새로운 listed-item 요소 만들고, 클래스 이름 listed-item으로 설정
  const newItem = document.createElement("div");
  newItem.classList.add("listed-item");

  // 고유한 id를 생성하는 법: 시간(날짜)은 계속 흐르니까 계속 바뀜. 즉, 시간(+날짜)을 이용해 고유한 아이디 만들기 좋음.
  const newId = Date.now(); //시간 기반 unique ID 생성

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = newId;
  // name은 아마 데이터를 백엔드로 보낼때 사용. 지금은 사용하지 않지만, 그래도 만들었음.
  checkbox.name = `to-do-${newId}`;

  const label = document.createElement("label");
  // label의 for을 id로 연결함으로서, label 즉 보여지는 text를 클릭해도 checked 처리 되게하기.
  label.htmlFor = newId;
  label.classList.add("tasks");

  //입력한 내용 버튼 누르면 내용 그대로 추가되게함
  label.textContent = inputText;

  // 삭제버튼 생성
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.classList.add(
    "btn",
    "btn-outline-secondary",
    "delete-btn",
    "material-symbols-outlined"
  );

  deleteButton.textContent = "delete";

    // 삭제 버튼 클릭 시 항목 삭제
  deleteButton.addEventListener("click", function () {
    listBoard.removeChild(newItem); // 해당 항목 삭제
  });

  // 새로운 항목을 listBoard에 추가
  newItem.appendChild(checkbox);
  newItem.appendChild(label);
  newItem.appendChild(deleteButton);
  listBoard.appendChild(newItem);

  // 입력 필드 초기화
  inputArea.value = "";
});
