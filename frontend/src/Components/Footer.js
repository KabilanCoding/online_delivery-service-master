import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="bg-orange">
        <div className="footer">© 2023 Copyright: Zip Zap</div>
        <div className="footer">
          <Link to="/feedback">Contact us</Link>
        </div>
      </div>
    </>
  );
}
