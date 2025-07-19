// nó phải đọc hết tất cả cái htmk rồi hà getTodos mới chạy
document.addEventListener("DOMContentLoaded", getTodos);

//CÁCH 1: CŨ
function getTodos() {
  // cách call API chuẩn chỉnh(nhưng mà đã cũ và outdate ít công ty sử dụng) nhưng vẫn nên học thuộc nhé
  fetch("https://6878735f63f24f1fdc9dff50.mockapi.io/tasks")
    // đầu tiên cần đưa nó về dang json
    .then((response) => response.json())
    // lúc này nếu bạn in ra luôn thì nó sẽ dính một cái promise vì thế cần xử lí
    //này là khi thành cồn thì nó sẽ trả về và lưu trong biến mà bạn đặt
    // lúc này mình sẽ để là data. Và sau đó in ra dữ liệu
    .then((data) => console.log(data))
    // này là khi thất bại
    .catch((error) => console.log("Thất bại rồi" + error));
}
console;

// CÁCH 2: NEW: SỬ DỤNG WEB AXIOS
// để sử dụng nó thì vẫn cần cdn
// đặc biệt trong api còn có các thuộc tính như get put delete
// chúng ta cần đưa nó về hàm đồng bộ sử dung async bởi vì ta cần nó đợi call api về rồi ms sử dụng
// vì thế sử dụng thêm hàm wait mà để dùng await thì phải là hàm đồng bộ (async-await)
async function getTodos() {
  try {
    const response = await axios.get(
      "https://6878735f63f24f1fdc9dff50.mockapi.io/tasks"
    );
    //lúc này nó log cho ta rất nhiều dữ liệu mà ta chỉ cần data vì thế chỉ cần .data
    console.log(response.data);
  //chúng ta cần tạo ra đủ số mục ở trong data api thì cần vòng lặp for mà trong js có 1 loại
  //vòng lặp for giúp hỗ trợ chạy từ đầu tới cuối( đưa cho cái mảng muốn quét.forEach(tên biến bạn muốn đặt) ở đây mình đặt là item
  //là từng phần tử có trong cái danh sách )
  // sau đó chúng ta log nó ra nếu log item (console.log(item)) thì nó sẽ log tất cả các dữ liệu trong item 
  // còn nếu muốn lấy id thì console.log(item.id) và các cái khác tương tự
    response.data.forEach((item) => {
      // đưa về định dạng ngày
    const date = new Date(item.createdAt);
    // cách để tạo các mục
    //B1: tạo li
        const li= document.createElement("li");

    //B2: gắn class todo-item
        li.className="todo-item";
    //B3: gắn thằng con và nội dung từ API cho thằng con
    // tác dụng của dấu huyền cho phép ta gắn biến vào chuỗi luôn
        li.innerHTML=`<div class="todo-content">
              <input type="checkbox" />
              <div>
                <span>${item.content}</span>
                <div>Create At: ${date.toLocaleDateString()} - ${date.toLocaleTimeString()}</div>
              </div>
            </div>
            <div class="todo-action">
              <button><i class="fa-solid fa-pen-to-square"></i></button>
              <button><i class="fa-solid fa-trash"></i></button>
            </div>`;
    //B4: gắn vào ul
    // cách lấy class 
        const ul = document.querySelector(".todo-list");
        // thêm li vào ul
        ul.appendChild(li);
         

    })
  } catch (error) {
    console.log("Thất bại rồi" + error);
  }




}
