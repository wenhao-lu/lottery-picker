export default function Footer() {
  const time = new Date().getFullYear();
  return <div className="mt-4 text-sm italic">&copy; Kevin Lu {time}</div>;
}
