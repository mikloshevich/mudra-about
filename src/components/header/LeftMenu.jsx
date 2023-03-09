const LeftMenu = ({ openLeft, setOpenLeft }) => {
    return (
        <div
            className="menuContainer leftMenu"
            data-menu-noclose
            style={{ transform: `translateX(${openLeft ? '0' : '-100%'})` }}
            onClick={(e) => {
                if (e.currentTarget === e.target) setOpenLeft(false)
            }}>
            <div className="leftMenuLogo">
                <svg width="157" height="21" viewBox="0 0 157 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.80495 15.4945V13.1222C8.85251 12.2193 8.59241 11.3269 8.06716 10.591C7.83655 10.289 7.53679 10.0469 7.19309 9.88489C6.8494 9.72292 6.47182 9.64587 6.09214 9.66023C5.7107 9.6527 5.33273 9.73388 4.98802 9.89737C4.64331 10.0609 4.3413 10.3022 4.10578 10.6023C3.57085 11.3048 3.29787 12.1719 3.33394 13.0541C3.29183 13.9424 3.54311 14.8199 4.04903 15.5512C4.27112 15.8595 4.56006 16.1136 4.89421 16.2944C5.22836 16.4752 5.59909 16.5782 5.97864 16.5955V20.432C5.1434 20.4173 4.3217 20.2185 3.57218 19.8496C2.82267 19.4807 2.16383 18.951 1.64269 18.2981C0.502059 16.8121 -0.0768437 14.9708 0.00819619 13.0995C-0.0682935 11.1662 0.507371 9.26328 1.64269 7.69657C2.11106 7.03506 2.7324 6.49657 3.45377 6.12699C4.17514 5.75741 4.97517 5.56769 5.78568 5.574C6.93499 5.52679 8.05657 5.93464 8.90711 6.70906C9.75884 7.54352 10.2722 8.66326 10.3486 9.85319H10.587C10.7749 8.84249 11.3185 7.93247 12.1193 7.28795C12.9249 6.63934 13.9344 6.29748 14.9684 6.32314C15.6934 6.31976 16.4088 6.49009 17.0545 6.81988C17.7003 7.14967 18.2577 7.62932 18.68 8.2187C19.6864 9.63319 20.1935 11.3423 20.1215 13.0768C20.2163 14.8828 19.6516 16.6618 18.5325 18.0824C17.9996 18.7054 17.3382 19.2055 16.5936 19.5484C15.849 19.8913 15.039 20.0688 14.2192 20.0688V16.3685C14.5971 16.3616 14.9693 16.2751 15.3116 16.1148C15.6538 15.9544 15.9584 15.7237 16.2056 15.4377C16.7133 14.7932 16.9713 13.9871 16.932 13.1676C16.9842 12.3537 16.7425 11.5482 16.251 10.8975C16.0302 10.6249 15.7493 10.4072 15.4302 10.2615C15.1112 10.1158 14.7627 10.0459 14.4122 10.0575C14.0439 10.0495 13.6788 10.1274 13.3458 10.2851C13.0129 10.4427 12.7212 10.6757 12.4939 10.9656C11.987 11.5841 11.7281 12.3689 11.7675 13.1676V15.4945H8.80495Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M35.1943 20.1247H31.5167V17.8546H31.2783C30.9614 18.6611 30.3815 19.337 29.6325 19.7728C28.8146 20.252 27.8786 20.4919 26.931 20.4652C26.2409 20.4995 25.5511 20.3913 24.9047 20.1472C24.2583 19.903 23.6691 19.5283 23.174 19.0464C22.6878 18.5174 22.3127 17.8963 22.0709 17.2197C21.8292 16.5432 21.7256 15.825 21.7665 15.1077V5.81152H25.5463V14.1656C25.5463 16.152 26.477 17.1508 28.3385 17.1508C28.7499 17.18 29.1628 17.1199 29.5488 16.9746C29.9348 16.8293 30.2848 16.6022 30.5749 16.309C30.8649 16.0157 31.0881 15.6632 31.2291 15.2756C31.3701 14.888 31.4256 14.4745 31.3919 14.0634V5.81152H35.1943V20.1247Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M38.3726 18.3547C37.2598 16.7806 36.7118 14.8766 36.8176 12.9518C36.7115 11.0252 37.2639 9.1199 38.384 7.54885C38.8859 6.90554 39.5336 6.39091 40.2738 6.04749C41.0139 5.70406 41.8252 5.54171 42.6405 5.57384C43.5442 5.55926 44.4348 5.79075 45.2171 6.24353C45.9574 6.67198 46.5479 7.31795 46.9083 8.09368H47.124V0.352539H50.9037V20.1254H47.2488V17.8552H47.0105C46.6359 18.6237 46.0334 19.2579 45.2852 19.6713C44.4748 20.1131 43.5633 20.3361 42.6405 20.3183C41.8242 20.3536 41.0113 20.1939 40.2692 19.8524C39.527 19.5109 38.8768 18.9975 38.3726 18.3547ZM41.5508 9.87573C40.9342 10.7828 40.6349 11.8683 40.6995 12.9631C40.6367 14.0613 40.9357 15.1499 41.5508 16.0618C41.8239 16.4299 42.1828 16.7256 42.5962 16.9234C43.0097 17.1212 43.4651 17.2151 43.9231 17.1969C44.3825 17.2141 44.8392 17.1198 45.2543 16.9221C45.6694 16.7245 46.0305 16.4293 46.3067 16.0618C46.9312 15.158 47.2349 14.0711 47.1694 12.9745C47.2299 11.8767 46.9223 10.7902 46.2954 9.88708C46.0103 9.53197 45.6492 9.24537 45.2386 9.04844C44.828 8.85152 44.3784 8.74928 43.9231 8.74928C43.4677 8.74928 43.0181 8.85152 42.6076 9.04844C42.197 9.24537 41.8358 9.53197 41.5508 9.88708V9.87573Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M53.2637 5.81088H56.9186V8.08101H57.1456C57.3465 7.34669 57.806 6.70974 58.4396 6.28761C59.1237 5.80673 59.9416 5.55264 60.7778 5.56117C61.2686 5.54485 61.759 5.60615 62.2307 5.74278V9.14797C61.6613 8.97337 61.0664 8.89661 60.4713 8.92096C59.5678 8.87607 58.6816 9.18094 57.9969 9.77226C57.6739 10.0742 57.4203 10.4428 57.2538 10.8524C57.0872 11.262 57.0115 11.7028 57.0321 12.1445V20.09H53.2637V5.81088Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M63.8788 19.1714C63.4465 18.7756 63.1057 18.2902 62.8803 17.7491C62.6548 17.2081 62.5501 16.6243 62.5735 16.0386C62.5502 15.4524 62.6679 14.8691 62.9168 14.3378C63.1657 13.8065 63.5384 13.3427 64.0037 12.9853C65.2165 12.1637 66.6478 11.7248 68.1126 11.7254L71.5178 11.5211V10.386C71.5178 9.13744 70.7119 8.51315 69.1001 8.51315C67.704 8.51315 66.83 8.95583 66.5235 9.84118H63.0957C63.1458 9.2057 63.3419 8.59037 63.6687 8.04307C63.9955 7.49577 64.4442 7.03126 64.9799 6.6857C66.291 5.87078 67.8193 5.47484 69.3612 5.55063C70.9383 5.44416 72.5033 5.88959 73.788 6.81055C74.3042 7.2466 74.7123 7.79642 74.9801 8.41681C75.248 9.0372 75.3683 9.71126 75.3317 10.386V20.1589H71.6313V18.252H71.4043C70.9806 18.9577 70.3653 19.5286 69.6298 19.8984C68.8944 20.2681 68.0691 20.4214 67.25 20.3405C66.018 20.3972 64.8113 19.9787 63.8788 19.1714ZM70.6892 16.7651C70.9701 16.549 71.1965 16.2701 71.3502 15.9508C71.5039 15.6315 71.5808 15.2806 71.5746 14.9263V13.882L68.6802 14.0636C67.0684 14.1771 66.2625 14.7447 66.2625 15.7889C66.262 16.0297 66.3183 16.2672 66.4268 16.4821C66.5352 16.6971 66.6928 16.8835 66.8868 17.0261C67.362 17.3451 67.9267 17.5042 68.4986 17.4802C69.2908 17.5115 70.068 17.2578 70.6892 16.7651Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M84.4999 6.74057C85.7662 5.86386 87.2862 5.42902 88.8245 5.50335C90.3343 5.42726 91.8302 5.82405 93.1037 6.63842C93.6116 6.99488 94.0297 7.46442 94.3252 8.01004C94.6206 8.55565 94.7853 9.16243 94.8063 9.78255H91.3103C91.106 8.79504 90.2888 8.29561 88.8472 8.29561C88.2619 8.26881 87.6816 8.41487 87.1787 8.71559C86.971 8.82298 86.7974 8.98602 86.6771 9.18648C86.5568 9.38693 86.4947 9.6169 86.4976 9.85065C86.4976 10.509 87.1446 10.9857 88.4386 11.2695L91.1173 11.8597C92.2509 12.0082 93.3223 12.4635 94.2161 13.1764C94.5415 13.5098 94.7951 13.9065 94.961 14.3419C95.127 14.7773 95.2018 15.2421 95.1809 15.7076C95.1927 16.3753 95.0392 17.0355 94.7343 17.6296C94.4293 18.2237 93.9823 18.7332 93.4329 19.1128C92.1017 20.029 90.5068 20.4835 88.8926 20.4068C87.3224 20.4791 85.7661 20.0841 84.4205 19.2717C83.8882 18.9201 83.4444 18.4504 83.1234 17.8991C82.8025 17.3479 82.6132 16.7299 82.5703 16.0935H86.2593C86.5657 17.1151 87.4624 17.6258 88.9721 17.6258C89.5967 17.6487 90.216 17.5037 90.7655 17.2059C90.9715 17.0965 91.1437 16.933 91.2637 16.733C91.3837 16.533 91.4469 16.304 91.4465 16.0708C91.4465 15.3898 90.8449 14.9357 89.6418 14.6633L87.0538 14.0844C84.2616 13.532 82.8654 12.1738 82.8654 10.0096C82.8515 9.37284 82.9931 8.74233 83.2779 8.17269C83.5627 7.60305 83.9822 7.11147 84.4999 6.74057Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M101.697 2.47363V5.95828H104.739V8.9208H101.697V15.3566C101.664 15.6069 101.69 15.8615 101.773 16.1001C101.855 16.3388 101.992 16.5548 102.173 16.7311C102.354 16.9075 102.573 17.0392 102.814 17.1158C103.054 17.1925 103.31 17.212 103.559 17.1727C103.937 17.1928 104.316 17.1928 104.694 17.1727V20.0444C104.073 20.162 103.442 20.219 102.81 20.2147C101.503 20.3276 100.195 20.0086 99.0868 19.3066C98.6809 18.925 98.3675 18.4555 98.1708 17.9342C97.9741 17.4129 97.8992 16.8534 97.9518 16.2987V8.9208H95.6816V5.95828H97.9518V2.47363H101.697Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M119.472 20.1247H115.783V17.8546H115.556C115.239 18.6642 114.654 19.3411 113.899 19.7728C112.878 20.3277 111.711 20.5556 110.556 20.4256C109.401 20.2957 108.313 19.8143 107.441 19.0464C106.956 18.5165 106.583 17.895 106.344 17.2184C106.104 16.5419 106.002 15.8242 106.045 15.1077V5.81152H109.813V14.1656C109.813 16.152 110.744 17.1508 112.605 17.1508C113.02 17.1738 113.435 17.1122 113.825 16.9697C114.216 16.8273 114.573 16.607 114.875 16.3222C115.161 16.0205 115.382 15.6634 115.525 15.273C115.667 14.8825 115.728 14.467 115.704 14.0521V5.81152H119.472V20.1247Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M122.674 18.3547C121.561 16.7806 121.013 14.8766 121.119 12.9518C121.01 11.0233 121.567 9.11601 122.696 7.54885C123.195 6.90504 123.841 6.38985 124.579 6.04629C125.318 5.70272 126.128 5.54073 126.942 5.57384C127.849 5.55777 128.744 5.78929 129.53 6.24353C130.267 6.67264 130.853 7.31876 131.209 8.09368H131.436V0.352539H135.205V20.1254H131.55V17.8552H131.323C130.941 18.6188 130.341 19.2511 129.598 19.6713C128.783 20.1131 127.868 20.336 126.942 20.3183C126.126 20.3527 125.313 20.1926 124.571 19.8511C123.829 19.5097 123.179 18.9968 122.674 18.3547ZM125.852 9.87573C125.235 10.7828 124.936 11.8683 125.001 12.9631C124.938 14.0613 125.237 15.1499 125.852 16.0618C126.142 16.4137 126.506 16.6971 126.918 16.8916C127.33 17.0861 127.78 17.187 128.236 17.187C128.691 17.187 129.141 17.0861 129.554 16.8916C129.966 16.6971 130.33 16.4137 130.619 16.0618C131.234 15.1541 131.533 14.0691 131.471 12.9745C131.534 11.878 131.231 10.7916 130.608 9.88708C130.322 9.53178 129.96 9.24512 129.548 9.04817C129.137 8.85122 128.686 8.74899 128.23 8.74899C127.774 8.74899 127.323 8.85122 126.912 9.04817C126.5 9.24512 126.138 9.53178 125.852 9.88708V9.87573Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M137.852 3.28045C137.653 3.11264 137.495 2.90191 137.388 2.66404C137.282 2.42618 137.231 2.16737 137.239 1.90703C137.23 1.64645 137.28 1.38709 137.386 1.14896C137.492 0.910837 137.652 0.700302 137.852 0.533598C138.323 0.18699 138.891 0 139.476 0C140.06 0 140.629 0.18699 141.099 0.533598C141.295 0.703043 141.451 0.914368 141.555 1.15204C141.659 1.38972 141.709 1.6477 141.7 1.90703C141.708 2.16624 141.658 2.42397 141.554 2.66152C141.45 2.89907 141.295 3.11049 141.099 3.28045C140.639 3.64715 140.063 3.83648 139.476 3.81394C138.887 3.84171 138.309 3.65179 137.852 3.28045ZM137.58 5.81165H141.348V20.1248H137.58V5.81165Z"
                        fill="#FEFEFE"
                    />
                    <path
                        d="M144.761 18.4441C143.452 16.9281 142.784 14.9617 142.9 12.9618C142.841 11.9718 142.978 10.9799 143.304 10.043C143.629 9.10616 144.136 8.24268 144.796 7.50212C145.461 6.82189 146.264 6.29173 147.15 5.94718C148.037 5.60264 148.987 5.45167 149.937 5.5044C150.888 5.45418 151.84 5.604 152.729 5.9442C153.619 6.28439 154.427 6.80739 155.102 7.47941C156.423 8.99017 157.099 10.9582 156.986 12.9618C157.103 14.9639 156.431 16.9323 155.113 18.4441C153.692 19.722 151.849 20.4289 149.937 20.4289C148.026 20.4289 146.183 19.722 144.761 18.4441ZM152.276 16.174C152.885 15.2138 153.175 14.0855 153.104 12.9504C153.172 11.8157 152.882 10.6883 152.276 9.72684C152.011 9.35782 151.659 9.06069 151.251 8.86246C150.842 8.66423 150.391 8.57119 149.937 8.59178C149.485 8.56892 149.035 8.66104 148.628 8.85954C148.221 9.05803 147.871 9.35642 147.61 9.72684C147 10.687 146.706 11.8145 146.771 12.9504C146.703 14.0903 146.997 15.2223 147.61 16.1854C147.885 16.5432 148.238 16.8331 148.643 17.0326C149.047 17.2321 149.492 17.3359 149.943 17.3359C150.394 17.3359 150.839 17.2321 151.243 17.0326C151.648 16.8331 152.001 16.5432 152.276 16.1854V16.174Z"
                        fill="#FEFEFE"
                    />
                </svg>
            </div>
            <button className="leftMenuArrow" data-menu-noclose onClick={() => setOpenLeft(false)}>
                <svg width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11 1L1 11L11 21" stroke="#FEFEFE" />
                </svg>
            </button>
            <div className="leftMenuBottom">
                <div className="leftMenuInfo">
                    <p data-menu-noclose>Worldwide</p>
                    <p data-menu-noclose className="leftMenuInfoTel">
                        +7 981 189 00 01
                    </p>
                    <p data-menu-noclose>hi@mudra-studio.com</p>
                </div>
                <div className="leftMenuSocial">
                    <div className="leftMenuSocialIcon" data-menu-noclose>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M17.086 2.90613C15.3785 1.2049 13.108 0.179557 10.6975 0.0210744C8.28694 -0.137408 5.90071 0.581782 3.98329 2.04468C2.06586 3.50758 0.747975 5.61443 0.275115 7.9728C-0.197746 10.3312 0.206661 12.7802 1.41301 14.8638L0 19.9999L5.27847 18.6216C6.73858 19.4131 8.37467 19.8277 10.0372 19.8274C12.0069 19.8283 13.9327 19.2477 15.5709 18.159C17.2091 17.0703 18.4862 15.5224 19.2407 13.7112C19.9952 11.8999 20.1932 9.90659 19.8097 7.9833C19.4261 6.06001 18.4783 4.29314 17.086 2.90613ZM14.9205 13.4518C14.7134 14.0298 13.7024 14.5876 13.2408 14.6294C12.7793 14.6711 12.357 14.8342 10.2551 14.0096C7.71469 13.0166 6.12168 10.4364 5.99716 10.2707C5.87264 10.105 4.98207 8.92337 4.98207 7.71076C4.97536 7.32523 5.04926 6.94252 5.19908 6.58694C5.3489 6.23136 5.57136 5.91069 5.85234 5.64528C5.93552 5.55099 6.03736 5.4748 6.15147 5.42148C6.26558 5.36816 6.38952 5.33885 6.51553 5.33539H6.9933C7.1706 5.34347 7.36685 5.35156 7.55363 5.76385C7.77424 6.25428 8.25743 7.47902 8.31969 7.60297C8.35933 7.6678 8.38196 7.7415 8.38551 7.81731C8.38906 7.89312 8.37341 7.96861 8.33999 8.03682C8.27778 8.18539 8.19436 8.32425 8.09231 8.44911C7.96779 8.59462 7.82974 8.77247 7.71875 8.88295C7.60777 8.99343 7.4643 9.14164 7.60912 9.38955C7.98333 10.0264 8.44989 10.6048 8.99371 11.1061C9.58341 11.629 10.2604 12.0453 10.9941 12.3362C11.2431 12.4602 11.388 12.4386 11.5355 12.2742C11.683 12.1098 12.1567 11.5507 12.3232 11.3028C12.4897 11.0549 12.6548 11.0966 12.8822 11.1788C13.1096 11.261 14.3331 11.8565 14.5821 11.9913C14.8312 12.126 14.9963 12.1772 15.0585 12.281C15.1208 12.3847 15.1208 12.8724 14.9137 13.4518H14.9205Z"
                                fill="#FEFEFE"
                            />
                        </svg>
                    </div>
                    <div className="leftMenuSocialIcon" data-menu-noclose>
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM10.3583 7.38244C9.3857 7.787 7.44177 8.62433 4.52657 9.89444C4.05318 10.0827 3.80521 10.2669 3.78263 10.4469C3.74448 10.7513 4.12558 10.8711 4.64455 11.0343C4.71514 11.0565 4.78829 11.0795 4.86327 11.1038C5.37385 11.2698 6.06068 11.464 6.41773 11.4717C6.74161 11.4787 7.1031 11.3452 7.50219 11.0711C10.226 9.23251 11.632 8.30318 11.7202 8.28314C11.7825 8.26901 11.8688 8.25124 11.9273 8.30321C11.9858 8.35518 11.98 8.4536 11.9738 8.48001C11.9361 8.64096 10.4401 10.0318 9.66591 10.7515C9.42457 10.9759 9.25338 11.135 9.21839 11.1714C9.13999 11.2528 9.06009 11.3298 8.98331 11.4038C8.50896 11.8611 8.15325 12.204 9.003 12.764C9.41135 13.0331 9.73812 13.2556 10.0641 13.4776C10.4201 13.7201 10.7752 13.9619 11.2347 14.2631C11.3517 14.3398 11.4635 14.4195 11.5724 14.4971C11.9867 14.7925 12.3589 15.0579 12.8188 15.0155C13.086 14.9909 13.362 14.7397 13.5022 13.9903C13.8335 12.2193 14.4847 8.38205 14.6352 6.80081C14.6484 6.66228 14.6318 6.48498 14.6185 6.40715C14.6051 6.32932 14.5773 6.21842 14.4761 6.13633C14.3563 6.03911 14.1714 6.01861 14.0886 6.02007C13.7125 6.0267 13.1355 6.22735 10.3583 7.38244Z"
                                fill="#FEFEFE"
                            />
                        </svg>
                    </div>
                    <div className="leftMenuSocialIcon" data-menu-noclose>
                        <svg
                            width="24"
                            height="25"
                            viewBox="0 0 24 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M18.8902 6.8499C18.7242 6.44406 18.5397 6.1489 18.2261 5.8353C17.9125 5.52169 17.6174 5.33722 17.2115 5.17119C16.8979 5.04206 16.4367 4.91293 15.5697 4.85759C14.6289 4.82069 14.3522 4.80225 11.9909 4.80225C11.6958 4.80225 11.4375 4.80225 11.1977 4.80225C9.55586 4.80225 9.22381 4.82069 8.41213 4.85759C7.5451 4.89448 7.08392 5.04206 6.77031 5.17119C6.36447 5.33722 6.06931 5.52169 5.75571 5.8353C5.4421 6.1489 5.25763 6.44406 5.0916 6.8499C4.96247 7.16351 4.83334 7.62469 4.778 8.49172C4.7411 9.43253 4.72266 9.70924 4.72266 12.0705C4.72266 14.4318 4.72266 14.7085 4.778 15.6493C4.81489 16.5163 4.96247 16.9775 5.0916 17.2911C5.25763 17.6969 5.4421 17.9921 5.75571 18.3057C6.06931 18.6193 6.36447 18.8038 6.77031 18.9698C7.08392 19.0989 7.5451 19.2281 8.41213 19.2834C9.35294 19.3203 9.62965 19.3388 11.9909 19.3388C14.3522 19.3388 14.6289 19.3388 15.5697 19.2834C16.4367 19.2465 16.8979 19.0989 17.2115 18.9698C17.6174 18.8038 17.9125 18.6193 18.2261 18.3057C18.5397 17.9921 18.7242 17.6969 18.8902 17.2911C19.0194 16.9775 19.1485 16.5163 19.2038 15.6493C19.2407 14.7085 19.2592 14.4318 19.2592 12.0705C19.2592 9.70924 19.2407 9.43253 19.2038 8.49172C19.1669 7.62469 19.0194 7.16351 18.8902 6.8499ZM11.9909 16.6085C9.48207 16.6085 7.43442 14.5793 7.43442 12.0705C7.43442 9.56166 9.46362 7.53245 11.9725 7.51401C14.4813 7.51401 16.5105 9.54321 16.5105 12.0705C16.5474 14.5793 14.4998 16.6085 11.9909 16.6085ZM16.7134 8.39948C16.1231 8.39948 15.6435 7.91985 15.6435 7.32953C15.6435 6.73922 16.1231 6.25959 16.7134 6.25959C17.3037 6.25959 17.7834 6.73922 17.7834 7.32953C17.7834 7.91985 17.3037 8.39948 16.7134 8.39948Z"
                                fill="#FEFEFE"
                            />
                            <path
                                d="M11.9906 15.0223C13.6207 15.0223 14.9422 13.7008 14.9422 12.0707C14.9422 10.4406 13.6207 9.11914 11.9906 9.11914C10.3605 9.11914 9.03906 10.4406 9.03906 12.0707C9.03906 13.7008 10.3605 15.0223 11.9906 15.0223Z"
                                fill="#FEFEFE"
                            />
                            <path
                                d="M23.9631 5.28176C23.8893 4.3225 23.7233 3.67684 23.3912 2.99429C23.1145 2.44087 22.8009 2.01658 22.3582 1.59229C21.5649 0.835949 20.5872 0.374765 19.4435 0.208739C18.8901 0.134949 18.7794 0.0980547 15.9016 0.0980547H11.9908C6.99154 0.0796074 5.5342 0.0796074 5.23905 0.116502C4.206 0.208739 3.57879 0.356318 2.87779 0.706817C2.34281 0.96508 1.91852 1.27868 1.49424 1.72142C0.737894 2.49621 0.27671 3.47392 0.110684 4.6361C0.0368947 5.18952 0 5.30021 0 8.15955C0 9.11881 0 10.3732 0 12.0704C0 17.0696 0 18.527 0.0368947 18.8221C0.129131 19.8183 0.27671 20.4455 0.608762 21.1465C1.23597 22.4562 2.4535 23.4524 3.89239 23.8213C4.39047 23.9505 4.92544 24.0243 5.62644 24.0427C5.9216 24.0612 8.94696 24.0612 11.9723 24.0612C14.9977 24.0612 18.0231 24.0612 18.3182 24.0427C19.1299 24.0058 19.6095 23.9505 20.1261 23.8029C21.5649 23.4339 22.7456 22.4562 23.4097 21.128C23.7417 20.4639 23.9078 19.7998 23.9816 18.859C24 18.6561 24 15.354 24 12.0704C23.9816 8.76831 23.9816 5.48468 23.9631 5.28176ZM20.7902 15.723C20.7533 16.6638 20.6057 17.3094 20.3843 17.8629C20.163 18.4532 19.8493 18.9328 19.3697 19.4309C18.8716 19.929 18.392 20.2241 17.8017 20.4455C17.2298 20.6668 16.6026 20.8144 15.6434 20.8513C14.7025 20.9067 14.3889 20.9251 11.9908 20.9251C9.59262 20.9251 9.27902 20.9067 8.3382 20.8698C7.39739 20.8329 6.75173 20.6853 6.17986 20.4639C5.58955 20.2426 5.10992 19.929 4.61184 19.4493C4.11376 18.9512 3.8186 18.4716 3.59723 17.8813C3.37586 17.3094 3.22829 16.6822 3.19139 15.723C3.1545 14.7821 3.13605 14.4685 3.13605 12.0704C3.13605 9.67223 3.1545 9.35862 3.19139 8.41781C3.22829 7.47699 3.37586 6.83134 3.59723 6.27792C3.8186 5.6876 4.13221 5.20797 4.61184 4.70989C5.10992 4.21181 5.58955 3.91666 6.17986 3.69529C6.75173 3.47392 7.37894 3.32634 8.31975 3.28945C9.27902 3.2341 9.59262 3.21566 11.9908 3.21566C14.3889 3.21566 14.7025 3.2341 15.6434 3.271C16.5842 3.30789 17.2298 3.45547 17.8017 3.67684C18.392 3.89821 18.8716 4.21181 19.3697 4.69144C19.8678 5.18952 20.163 5.66915 20.3843 6.25947C20.6057 6.83134 20.7533 7.45855 20.7902 8.41781C20.8455 9.35862 20.8455 9.67223 20.8455 12.0704C20.8455 14.4685 20.8455 14.7821 20.7902 15.723Z"
                                fill="#FEFEFE"
                            />
                        </svg>
                    </div>
                    <div className="leftMenuSocialIcon" data-menu-noclose>
                        <svg
                            width="22"
                            height="23"
                            viewBox="0 0 22 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0 1.58992C0 0.714262 0.727856 0.00397491 1.62576 0.00397491H20.3742C21.2721 0.00397491 22 0.714262 22 1.58992V20.5576C22 21.4336 21.2721 22.1436 20.3742 22.1436H1.62576C0.727856 22.1436 0 21.4336 0 20.5576V1.58992Z"
                                fill="#FEFEFE"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M6.66973 18.5371V8.53985H3.34682V18.5371H6.66973ZM5.00826 7.17489C6.16702 7.17489 6.88826 6.40721 6.88826 5.44784C6.86666 4.46687 6.16702 3.72049 5.03024 3.72049C3.89358 3.72049 3.15039 4.46687 3.15039 5.44784C3.15039 6.40721 3.87147 7.17489 4.9866 7.17489H5.00826Z"
                                fill="#030303"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M8.50781 18.5371H11.8307V12.9542C11.8307 12.6554 11.8523 12.3569 11.94 12.1433C12.1802 11.5464 12.727 10.9281 13.645 10.9281C14.8473 10.9281 15.3283 11.8449 15.3283 13.1888V18.5371H18.6509V12.8048C18.6509 9.73411 17.0116 8.30526 14.8254 8.30526C13.0328 8.30526 12.2458 9.30723 11.8086 9.98971H11.8308V8.53985H8.5079C8.55151 9.47793 8.50781 18.5371 8.50781 18.5371Z"
                                fill="#030303"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftMenu