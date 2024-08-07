import next from "next";

const FooterMobile: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-black pl-1 pb-2 pr-1 pt-3 flex justify-around items-center md:hidden text-[9px]">
            <div className="flex w-full justify-between">
                <div className="text-center flex flex-col items-center flex-1">
                    <svg className="w-6 h-6" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6867 0.0982985L0.114698 12.0156C-0.123481 12.241 0.0340921 12.6458 0.359638 12.6458H2.46112C2.65926 12.6458 2.81995 12.8089 2.81995 13.01V23.6358C2.81995 23.8369 2.98065 24 3.17878 24H11.3726C11.5707 24 11.7314 23.8369 11.7314 23.6358V16.4305C11.7314 16.2295 11.8921 16.0664 12.0902 16.0664H13.6722C13.8703 16.0664 14.031 16.2295 14.031 16.4305V24H22.5893C22.7875 24 22.9482 23.8369 22.9482 23.6358V13.105C22.9482 12.9039 23.1088 12.7408 23.307 12.7408H25.6404C25.9665 12.7408 26.1235 12.3355 25.8848 12.1101L13.175 0.0977718C13.0372 -0.0325906 12.8235 -0.0325906 12.6857 0.0977718L12.6867 0.0982985Z" fill="#FF3B5C" />
                    </svg>
                    <h1 className="mt-1">Home</h1>
                </div>

                <div className="text-center flex flex-col items-center flex-1">
                    <svg className="w-6 h-6" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z" stroke="white" stroke-miterlimit="10" />
                        <path d="M10.4328 12.6361L9.16772 20.8826L17.0097 16.2281L18.4265 7.88L10.4328 12.6355V12.6361ZM15.1984 15.1868L11.7787 17.2166L12.3303 13.6208L15.8161 11.5471L15.1984 15.1873V15.1868Z" fill="white" />
                    </svg>
                    <h1 className="mt-1">Discover</h1>
                </div>

                <div className="text-center flex flex-col items-center flex-1">
                    <svg className="w-6 h-6" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6867 0.0982985L0.114698 12.0156C-0.123481 12.241 0.0340921 12.6458 0.359638 12.6458H2.46112C2.65926 12.6458 2.81995 12.8089 2.81995 13.01V23.6358C2.81995 23.8369 2.98065 24 3.17878 24H11.3726C11.5707 24 11.7314 23.8369 11.7314 23.6358V16.4305C11.7314 16.2295 11.8921 16.0664 12.0902 16.0664H13.6722C13.8703 16.0664 14.031 16.2295 14.031 16.4305V24H22.5893C22.7875 24 22.9482 23.8369 22.9482 23.6358V13.105C22.9482 12.9039 23.1088 12.7408 23.307 12.7408H25.6404C25.9665 12.7408 26.1235 12.3355 25.8848 12.1101L13.175 0.0977718C13.0372 -0.0325906 12.8235 -0.0325906 12.6857 0.0977718L12.6867 0.0982985Z" fill="#FF3B5C" />
                    </svg>
                </div>

                <div className="text-center flex flex-col items-center flex-1">
                    <svg className="w-6 h-6" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5672 24.3835L10.2707 24.0655H9.83583H1V1H27.9898L27.7583 23.8488L19.1242 24.1941L18.7287 24.2099L18.4512 24.4921L14.4564 28.5543L10.5672 24.3835ZM20.271 15.882H21.271V14.882V11.884V10.884H20.271H8.5985H7.5985V11.884V14.882V15.882H8.5985H20.271Z" stroke="white" stroke-width="1" />
                    </svg>
                    <h1 className="mt-1">Inbox</h1>
                </div>

                <div className="text-center flex flex-col items-center flex-1">
                    <svg className="w-6 h-6" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 31C1 31 1.70315 20.1955 11.485 20.1955C21.2668 20.1955 22.3535 31 22.3535 31M19.1432 7.85658C19.1432 11.6434 16.0734 14.7132 12.2866 14.7132C8.49986 14.7132 5.43006 11.6434 5.43006 7.85658C5.43006 4.06979 8.49986 1 12.2866 1C16.0734 1 19.1432 4.06979 19.1432 7.85658Z" stroke="white" stroke-miterlimit="10" />
                    </svg>
                    <h1 className="mt-1">Profile</h1>
                </div>
            </div>
        </footer>
    );
}

export default FooterMobile;
