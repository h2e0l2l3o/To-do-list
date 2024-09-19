# TO-DO-LIST

할 일을 추가할 수 있는 투두리스트 웹페이지.

[투두리스트 웹페이지](https://todolistforonlytoday.netlify.app/)


## 기능
- 할일을 입력창에 입력하고,추가버튼(+)을 누르면 할일이 추가됨.
- 추가된 항목은 delete버튼, 할일 내용, 체크박스를 포함하고 있음.
- delete 버튼을 누르면 항목 사라짐.
    ```js
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

    ```

    + `trim()`: 문자열의 양쪽 끝에서 공백 문자(스페이스, 탭, 줄바꿈 등)를 제거하는 메서드. 문자열 내부의 공백은 제거하지 않음.
    + `createElement()`:  HTML 문서에 새로운 요소를 동적으로 생성하는 메서드. 메서드를 호출할 때 태그 이름을 인자로 전달하여 해당 태그의 새로운 DOM 요소를 만들어냄.
    + `classList.add()`:  선택한 요소의 class 목록에 새로운 클래스를 추가하는 메서드. 여러 개의 클래스를 동시에 추가 가능.
    + `Date.now()`: 현재 시간을 밀리초 단위로 반환하는 정적 메서드. 고유한 ID를 생성하거나, 시간 기반의 값을 계산할 때 사용.
    + `removeChild()`: DOM에서 선택한 요소의 자식 노드를 제거하는 메서드.
    + `appendChild()`: 선택한 요소에 자식 노드를 마지막에 추가하는 메서드. 추가되는 노드는 반드시 DOM 요소여야함.

- 체크 박스 디자인을 좀 더 보기 좋게 바꿨고, label 또는 체크박스 클릭 시 task가 완료됨을 보여줌(line-through)

    + 체크박스
        + `id`: HTML 요소를 유일하게 식별하는 데 사용(체크박스를 식별하는 유일한 식별자)
        + `name`: 주로 폼(form) 안에서 데이터를 서버로 보낼 때 사용. 같은 name을 가진 여러 요소가 있을 수 있으며, 서버에 전송될 때 해당 요소들의 값이 name 속성을 기준으로 전달됨.
        + `for`: label 태그의 for 속성은 그 레이블(label)이 어떤 폼 요소와 연결되는지를 지정. **for 속성에 들어가는 값은 연결하려는 폼 요소의 id 값과 동일해야함**
            +  이렇게 연결하면, 사용자가 해당 레이블을 클릭할 때 자동으로 그 폼 요소가 선택됨!!

    ```html
        <input type="checkbox" id="1" name="to-do1" checked />
        <label class="tasks" for="1">해야할 일1</label>

    ```

    + 체크박스 디자인 바꾸기 
        ```css
          input[type="checkbox"] {
            display: none;
          }
          input[type="checkbox"] + label {
            display: inline-block;
            position: relative;
            padding-left: 30px;
            cursor: pointer;
          }
          input[type="checkbox"] + label::before {
            display: block;
            content: "";
            font-size: 20px;
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            position: absolute;
            left: 0;
            top: 6px;
            border: 1px solid #ddd;
            color: lightcoral;
          }

          input[type="checkbox"]:checked + label::before {
            content: "✔";
          }
        ```
          + `display: none;`으로 기존 체크박스 안보이게하기.
          + `+`: 인접 형제 결합자(adjacent sibling combinator)로, 특정 요소 바로 뒤에 오는 형제요소 선택 시 사용
          + `::before`: 가상요소로, **무조건 `content`요소 속성을 사용해야함**. 이 속성으로 삽입할 텍스트를 지정하고 이를 선택한 요소의 내용 앞에 추가함. 실제 HTML문서에 존재하지 않지만, 시각적으로 요소 앞에 추가된 내용처럼 보임.
          + `inline-block`:  inline-block으로 지정된 엘리먼트는 **기본적으로 inline 엘리먼트처럼 한 줄에 다른 엘리먼트들과 배치**된다. 하지만 inline 엘리먼트에서 불가능하던 **width와 height 속성 지정 및 margin과 padding 속성의 상하 간격 지정이 가능**


    + 글 중앙에 선 긋기

      ```css

        input[type="checkbox"]:checked + label {
          text-decoration: line-through;
          /* 글 중앙에 선 긋는 효과 넣어서 task 완료 표시해주기 */
        }

      ```
      + checkbox가 checked되면, 그 인접형제요소인 label에 중앙선 효과 적용됨.


### 추가내용
  - const, let, var는 모두 JavaScript에서 변수를 선언할 때 사용하는 키워드이지만, 몇 가지 중요한 차이점이 있습니다. 각 키워드는 변수의 스코프, 재할당 가능성, 호이스팅(hoisting) 등에 따라 다르게 작동합니다.
    + var: 함수 스코프, 재선언 가능, 호이스팅 가능 (undefined 상태로 참조)
    + let: 블록 스코프, 재선언 불가, 호이스팅되지만 선언 전에 참조 불가 (TDZ)
    + const: 블록 스코프, 재선언 및 재할당 불가, 호이스팅되지만 선언 전에 참조 불가 (TDZ), 참조형 데이터는 내부 값 수정 가능

      * The Temporal Dead Zone (TDZ) is a concept in JavaScript that relates to the hoisting of the variables and the visibility of variables declared with let and const . In the TDZ, a variable exists but it cannot be accessed until it is not declared.  (from GeeksforGeeks)

