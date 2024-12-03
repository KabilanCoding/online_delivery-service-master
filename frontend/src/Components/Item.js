import { useNavigate } from "react-router-dom";
function Items(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex-box">
        <h2>{props.title}</h2>
      </div>
      <div className="hr-line"></div>
      <div className="flex-box">
        {props.item.map((item, i) => (
          <div
            className="flex-container"
            key={i}
            onClick={() => {
              navigate("/product" + item.link);
            }}
          >
            <img src={item.src} alt="" height={200} width={250}></img>
          </div>
        ))}
      </div>
      <div className="hr-line"></div>
    </>
  );
}

export default Items;
