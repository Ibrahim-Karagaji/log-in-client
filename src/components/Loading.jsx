export default function Loading({ dialogRef }) {
  return (
    <dialog
      className="left-0 top-[3.5%] w-full h-full bg-[#0000005e]"
      ref={dialogRef}
    >
      <div className="loadingElement !mt-[250px]"></div>
    </dialog>
  );
}
