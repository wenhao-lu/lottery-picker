export default function Footer() {
  const time = new Date().getFullYear();
  return <div className="footer">&copy; Kevin Lu {time}</div>;
}
