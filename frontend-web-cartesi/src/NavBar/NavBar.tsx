import Container from "../Container";
import { Network } from "../Network";

const Navbar = () => {
  return (
    <div
      className="sticky top-0 z-50 w-full bg-gradient-to-r from-purple-500 to-fuchsia-600
      shadow-sm  "
    >
      <div className="py-4 broder-b-[1px]">
        <Container>
          <div
            className="flex items-center justify-between
                gap-3 md:gap-0"
          >
            <a
              href={"/"}
              className={` font-bold text-2xl
                     sm:text-xl text-white`}
              style={{ fontFamily: "Henny Penny", fontSize: "30px" }}
            >
              BottleBrain
            </a>
            <div className="hidden md:block"></div>
            <div className="flex items-center gap-8 md:gap-12 ">
              {/* <button className="p-2 flex rounded-md bg-green-500 text-xl text-white"> */}
              <Network />

              {/* </button> */}

              <div className="cursor-pointer"></div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
