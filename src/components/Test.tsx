import { Link, Portal } from "@mui/material";

export default function Test() {
  return (
    <>
      <Link href="#">Link</Link>
      <Link href="#" color="primary">
        {'color="inherit"'}
      </Link>
      <Link href="#" variant="body2">
        {'variant="body2"'}
      </Link>

      <Portal container={document.getElementById("modal")}>
        <span className="text-red-700">THIS IS SPAN IN PROTAL</span>
      </Portal>
    </>
  );
}
