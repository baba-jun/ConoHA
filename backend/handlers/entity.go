package handlers

/*==========================Price==========================*/

type Price struct {
	TypeID        int
	PlanID        int
	OriginalPrice float64
	RealPrice     float64
}

/*==========================Server==========================*/

type RequestData struct {
	Flag        string `json:"flag"`
	Password    string `json:"password"`
	ServerName  string `json:"server_name"`
	FlavorName  string `json:"flavor_name"`
}

/*==========================Auth==========================*/

type AuthRequest struct {
	Auth Auth `json:"auth"`
}

type Auth struct {
	Identity Identity `json:"identity"`
	Scope    Scope    `json:"scope"`
}

type Identity struct {
	Methods  []string `json:"methods"`
	Password Password `json:"password"`
}

type Password struct {
	User User `json:"user"`
}

type User struct {
	ID       string `json:"id"`
	Password string `json:"password"`
}

type Scope struct {
	Project Project `json:"project"`
}

type Project struct {
	ID string `json:"id"`
}

type AuthResponse struct {
	Token Token `json:"token"`
}

type Token struct {
	ExpiresAt string `json:"expires_at"`
}
