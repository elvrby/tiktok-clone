import next from "next";
import Link from "next/link";

const FooterMobile: React.FC = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-black pl-1 pb-2 pr-1 pt-3 flex justify-around items-center md:hidden text-[9px] text-white">
            <div className="flex w-full justify-between">
                <div className="text-center flex flex-col items-center flex-1">
                    <svg className="w-6 h-6" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6867 0.0982985L0.114698 12.0156C-0.123481 12.241 0.0340921 12.6458 0.359638 12.6458H2.46112C2.65926 12.6458 2.81995 12.8089 2.81995 13.01V23.6358C2.81995 23.8369 2.98065 24 3.17878 24H11.3726C11.5707 24 11.7314 23.8369 11.7314 23.6358V16.4305C11.7314 16.2295 11.8921 16.0664 12.0902 16.0664H13.6722C13.8703 16.0664 14.031 16.2295 14.031 16.4305V24H22.5893C22.7875 24 22.9482 23.8369 22.9482 23.6358V13.105C22.9482 12.9039 23.1088 12.7408 23.307 12.7408H25.6404C25.9665 12.7408 26.1235 12.3355 25.8848 12.1101L13.175 0.0977718C13.0372 -0.0325906 12.8235 -0.0325906 12.6857 0.0977718L12.6867 0.0982985Z" fill="white" />
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

                <div className="text-center flex flex-col items-center flex-1 justify-center">
                    <svg className="w-12 h-8" viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.5039 19.1278C17.3908 19.1278 12.2777 19.1278 7.16465 19.1278C7.10153 19.1278 7.06996 19.0647 7.00684 19.0647C4.22935 18.4334 2.52499 16.3503 2.52499 13.5097C2.52499 10.89 2.52499 8.27038 2.52499 5.6507C2.52499 4.2304 2.96686 2.93634 3.91373 1.86322C4.79748 0.853227 5.93372 0.348229 7.19621 0.0641682C12.3409 0.0641682 17.454 0.0641682 22.5986 0.0641682C22.6618 0.0957305 22.7564 0.127293 22.8196 0.158855C25.5024 0.726977 27.2067 2.84165 27.2067 5.58758C27.2067 8.30194 27.2067 11.0479 27.2067 13.7622C27.2067 14.9616 26.828 16.0663 26.1021 17.0447C25.1867 18.2441 23.9558 18.8438 22.5039 19.1594V19.1278ZM12.5934 9.62756C13.0984 9.62756 13.6034 9.62756 14.0768 9.62756C14.4556 9.62756 14.5818 9.72224 14.5502 10.101C14.5502 11.0163 14.5502 11.9632 14.5502 12.8785C14.5502 13.2888 14.6765 13.415 15.0868 13.415C15.4971 13.415 15.6234 13.2572 15.6234 12.8785C15.6234 11.9947 15.6234 11.1425 15.6234 10.2588C15.6234 9.75381 15.718 9.56443 16.2546 9.59599C17.1383 9.65912 18.0221 9.59599 18.9374 9.59599C19.3477 9.59599 19.4108 9.43818 19.4108 9.091C19.4108 8.71225 19.3161 8.55444 18.9374 8.586C18.0537 8.586 17.1699 8.586 16.2546 8.586C15.7812 8.586 15.5918 8.52287 15.6234 7.98631C15.6865 7.16569 15.6549 6.34507 15.6234 5.49289C15.6234 5.1457 15.9074 4.57758 15.1184 4.57758C14.2662 4.57758 14.6134 5.17727 14.5818 5.52445C14.5502 6.37663 14.5502 7.22882 14.5818 8.081C14.5818 8.49131 14.4556 8.586 14.0452 8.586C13.0668 8.586 12.0884 8.586 11.1415 8.586C10.7628 8.586 10.5734 8.64912 10.5734 9.091C10.5734 9.50131 10.7312 9.62756 11.1099 9.59599C11.6149 9.59599 12.0884 9.59599 12.5934 9.59599V9.62756Z" fill="white"/>
                        <path d="M22.5039 19.1278C23.9243 18.8122 25.1867 18.2125 26.1021 17.0131C26.828 16.0347 27.2067 14.9616 27.2067 13.7307C27.2067 11.0163 27.2067 8.27038 27.2067 5.55601C27.2067 2.81009 25.5024 0.695415 22.8196 0.127293C22.7564 0.127293 22.6618 0.064168 22.5986 0.0326056C23.798 0.0326056 24.9974 -0.125206 26.1652 0.253542C28.343 0.916351 29.9211 2.87322 29.9527 5.1457C30.0158 8.11256 30.0158 11.0479 29.9527 14.0147C29.8895 16.8553 27.4908 19.1278 24.6186 19.1278C23.9243 19.1278 23.1983 19.1278 22.5039 19.1278Z" fill="#FD2A6D"/>
                        <path d="M7.19621 0.0326057C5.93372 0.316667 4.79748 0.821664 3.91373 1.83166C2.9353 2.90478 2.52499 4.19883 2.52499 5.61914C2.52499 8.23881 2.52499 10.8585 2.52499 13.4782C2.52499 16.3188 4.22935 18.4019 7.00684 19.0331C7.06996 19.0331 7.13309 19.0963 7.16465 19.0963C6.18622 19.0963 5.20779 19.1909 4.26092 19.0016C1.79905 18.465 0.0315623 16.3503 0 13.8253C0 10.9847 0 8.11256 0 5.27195C0 2.43134 2.36718 0.0957304 5.20779 0.0326057C5.87059 0.0326057 6.5334 0.0326057 7.19621 0.0326057Z" fill="#01D5EB"/>
                        <path d="M12.5934 9.62756C12.0884 9.62756 11.5834 9.62756 11.1099 9.62756C10.7312 9.62756 10.5734 9.53287 10.5734 9.12256C10.5734 8.68069 10.7628 8.61756 11.1415 8.61756C12.1199 8.61756 13.0984 8.61756 14.0452 8.61756C14.424 8.61756 14.5818 8.55444 14.5818 8.11256C14.5502 7.26038 14.5502 6.4082 14.5818 5.55602C14.5818 5.17727 14.2662 4.57758 15.1184 4.60915C15.9074 4.60915 15.5918 5.17727 15.6234 5.52445C15.6549 6.34507 15.6865 7.16569 15.6234 8.01788C15.6234 8.52287 15.7812 8.61756 16.2546 8.61756C17.1383 8.586 18.0221 8.61756 18.9374 8.61756C19.3161 8.61756 19.4108 8.77537 19.4108 9.12256C19.4108 9.50131 19.3477 9.65912 18.9374 9.62756C18.0537 9.62756 17.1699 9.62756 16.2546 9.62756C15.718 9.62756 15.5918 9.78537 15.6234 10.2904C15.6549 11.1425 15.6234 12.0263 15.6234 12.91C15.6234 13.3203 15.4971 13.4466 15.0868 13.4466C14.6765 13.4466 14.5502 13.3203 14.5502 12.91C14.5502 11.9947 14.5502 11.0479 14.5502 10.1326C14.5502 9.75381 14.424 9.62756 14.0768 9.65912C13.5718 9.69068 13.0984 9.65912 12.5934 9.65912V9.62756Z" fill="black"/>
                    </svg>
                </div>

                <div className="text-center flex flex-col items-center flex-1">
                    <svg className="w-6 h-6" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5672 24.3835L10.2707 24.0655H9.83583H1V1H27.9898L27.7583 23.8488L19.1242 24.1941L18.7287 24.2099L18.4512 24.4921L14.4564 28.5543L10.5672 24.3835ZM20.271 15.882H21.271V14.882V11.884V10.884H20.271H8.5985H7.5985V11.884V14.882V15.882H8.5985H20.271Z" stroke="white" stroke-width="1" />
                    </svg>
                    <h1 className="mt-1">Inbox</h1>
                </div>

                <Link href="/login" passHref className="text-center flex flex-col items-center flex-1">
                    <div className="text-center flex flex-col items-center flex-1">
                        <svg className="w-6 h-6" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 31C1 31 1.70315 20.1955 11.485 20.1955C21.2668 20.1955 22.3535 31 22.3535 31M19.1432 7.85658C19.1432 11.6434 16.0734 14.7132 12.2866 14.7132C8.49986 14.7132 5.43006 11.6434 5.43006 7.85658C5.43006 4.06979 8.49986 1 12.2866 1C16.0734 1 19.1432 4.06979 19.1432 7.85658Z" stroke="white" stroke-miterlimit="10" />
                        </svg>
                        <h1 className="mt-1">Profile</h1>
                    </div>
                </Link>

            </div>
        </footer>
    );
}

export default FooterMobile;
