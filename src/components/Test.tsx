export default function Test({ firstname }: { firstname: string }) {
  return (
    <h1 className="bg-green-400 font-bold text-red-600">Hello {firstname}</h1>
  );
}
